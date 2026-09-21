import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Output,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import type { ExperienceContent } from '../../content/experience.model';

interface OrbitBody {
  angle: number;
  baseRotation: THREE.Euler;
  group: THREE.Group;
  index: number;
  planet: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  radius: number;
  ring: THREE.LineLoop;
  size: number;
  speed: number;
}

@Component({
  selector: 'app-orbital-scene',
  standalone: true,
  templateUrl: './orbital-scene.html',
  styleUrl: './orbital-scene.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrbitalSceneComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) experiences: ExperienceContent[] = [];
  @Input() selectedIndex = 0;
  @Output() readonly experienceSelected = new EventEmitter<number>();

  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('viewport', { static: true }) private viewportRef!: ElementRef<HTMLElement>;
  @ViewChildren('labelElement') private labelElements!: QueryList<ElementRef<HTMLButtonElement>>;

  fallbackVisible = false;
  isDragging = false;
  yaw = -0.48;
  pitch = 0.28;
  distance = 13.8;

  private animationFrame = 0;
  private bodies: OrbitBody[] = [];
  private camera?: THREE.PerspectiveCamera;
  private dragState: {
    id: number;
    moved: boolean;
    pitch: number;
    x: number;
    y: number;
    yaw: number;
  } | null = null;
  private glow?: THREE.Sprite;
  private hoveredIndex: number | null = null;
  private labelNodes: HTMLButtonElement[] = [];
  private raycaster = new THREE.Raycaster();
  private renderer?: THREE.WebGLRenderer;
  private resizeObserver?: ResizeObserver;
  private scene?: THREE.Scene;
  private sun?: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  private textures: THREE.Texture[] = [];
  private world?: THREE.Group;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly zone: NgZone,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.labelNodes = this.labelElements.map((element) => element.nativeElement);
    this.labelElements.changes.subscribe(() => {
      this.labelNodes = this.labelElements.map((element) => element.nativeElement);
    });

    if (typeof WebGLRenderingContext === 'undefined') {
      this.fallbackVisible = true;
      this.changeDetector.markForCheck();
      return;
    }

    try {
      this.createScene();
      this.zone.runOutsideAngular(() => this.animate());
    } catch {
      this.fallbackVisible = true;
      this.changeDetector.markForCheck();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.resizeObserver?.disconnect();
    this.textures.forEach((texture) => texture.dispose());
    this.bodies.forEach(({ planet, ring }) => {
      planet.material.dispose();
      ring.geometry.dispose();
    });
    this.renderer?.dispose();
  }

  formatNumber(value: number): string {
    return value.toString().padStart(2, '0');
  }

  selectExperience(index: number): void {
    this.experienceSelected.emit(index);
  }

  rotateCamera(delta: number): void {
    this.yaw += THREE.MathUtils.degToRad(delta);
    this.updateCamera();
  }

  resetView(): void {
    this.yaw = -0.48;
    this.pitch = 0.28;
    this.distance = 13.8;
    this.updateCamera();
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    this.distance = THREE.MathUtils.clamp(this.distance + event.deltaY * 0.012, 8, 20);
    this.updateCamera();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.rotateCamera(12);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.rotateCamera(-12);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.pitch = THREE.MathUtils.clamp(this.pitch + 0.12, -1.47, 1.47);
      this.updateCamera();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.pitch = THREE.MathUtils.clamp(this.pitch - 0.12, -1.47, 1.47);
      this.updateCamera();
    } else if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      this.distance = Math.max(8, this.distance - 0.8);
      this.updateCamera();
    } else if (event.key === '-') {
      event.preventDefault();
      this.distance = Math.min(20, this.distance + 0.8);
      this.updateCamera();
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.resetView();
    }
  }

  startPointer(event: PointerEvent): void {
    const target = event.target;
    if (event.button !== 0 || (target instanceof Element && target.closest('button, a'))) {
      return;
    }

    this.dragState = {
      id: event.pointerId,
      moved: false,
      pitch: this.pitch,
      x: event.clientX,
      y: event.clientY,
      yaw: this.yaw,
    };
    this.isDragging = true;
    this.viewportRef.nativeElement.setPointerCapture(event.pointerId);
    this.updateHover(event);
  }

  movePointer(event: PointerEvent): void {
    if (!this.dragState) {
      this.updateHover(event);
      return;
    }

    const deltaX = event.clientX - this.dragState.x;
    const deltaY = event.clientY - this.dragState.y;
    this.dragState.moved ||= Math.hypot(deltaX, deltaY) > 5;
    this.yaw = this.dragState.yaw - deltaX * 0.009;
    this.pitch = THREE.MathUtils.clamp(this.dragState.pitch + deltaY * 0.008, -1.47, 1.47);
    this.updateCamera();
  }

  endPointer(event: PointerEvent): void {
    if (!this.dragState || this.dragState.id !== event.pointerId) {
      return;
    }

    if (!this.dragState.moved && this.hoveredIndex !== null) {
      this.zone.run(() => this.selectExperience(this.hoveredIndex!));
    }

    const viewport = this.viewportRef.nativeElement;
    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    this.dragState = null;
    this.isDragging = false;
  }

  clearHover(): void {
    if (!this.dragState) {
      this.setHoveredIndex(null);
    }
  }

  focusPlanet(index: number | null): void {
    this.setHoveredIndex(index);
  }

  private createScene(): void {
    const canvas = this.canvasRef.nativeElement;
    const viewport = this.viewportRef.nativeElement;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    this.renderer = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const world = new THREE.Group();
    world.rotation.z = -0.08;
    scene.add(world);
    scene.add(new THREE.AmbientLight(0xc9afe5, 0.75));

    const sunLight = new THREE.PointLight(0xff5638, 3.4, 36, 1.7);
    scene.add(sunLight);
    const rimLight = new THREE.DirectionalLight(0xa784ff, 1.15);
    rimLight.position.set(-6, 5, 8);
    scene.add(rimLight);

    this.scene = scene;
    this.camera = camera;
    this.world = world;
    this.createSun(world);
    this.createOrbitBodies(world);
    this.createStarfield(scene);
    this.updateCamera();

    const resize = () => {
      const width = Math.max(1, viewport.clientWidth);
      const height = Math.max(1, viewport.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    this.resizeObserver = new ResizeObserver(resize);
    this.resizeObserver.observe(viewport);
    resize();
  }

  private createSun(world: THREE.Group): void {
    const texture = this.createSurfaceTexture('sun', '#f0442c', '#ff7047', '#ffd05f');
    const material = new THREE.MeshStandardMaterial({
      emissive: 0xf0442c,
      emissiveIntensity: 1.2,
      emissiveMap: texture,
      map: texture,
      metalness: 0,
      roughness: 0.72,
    });
    const sun = new THREE.Mesh(new THREE.SphereGeometry(1.38, 72, 48), material);
    world.add(sun);
    this.sun = sun;

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.53, 48, 32),
      new THREE.MeshBasicMaterial({
        blending: THREE.AdditiveBlending,
        color: 0xff5738,
        opacity: 0.12,
        side: THREE.BackSide,
        transparent: true,
      }),
    );
    sun.add(atmosphere);

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        blending: THREE.AdditiveBlending,
        color: 0xff7047,
        depthWrite: false,
        map: this.createGlowTexture(),
        opacity: 0.75,
        transparent: true,
      }),
    );
    glow.scale.set(5.6, 5.6, 1);
    world.add(glow);
    this.glow = glow;
  }

  private createOrbitBodies(world: THREE.Group): void {
    const palette = ['#e06450', '#8e65b8', '#ff9950', '#6e416f', '#d95566', '#a47bd1'];
    const sphereGeometry = new THREE.SphereGeometry(1, 56, 40);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    this.bodies = this.experiences.map((experience, index) => {
      const radius = 2.55 + index * 0.52;
      const size = 0.3 + (index % 4) * 0.055;
      const speed = (0.19 + (index % 3) * 0.055) * (index % 2 === 0 ? 1 : -1);
      const tilt = index * goldenAngle;
      const rotation = new THREE.Euler(
        0.28 + ((index * 0.31) % 1.08),
        -0.52 + ((index * 0.47) % 1.12),
        -0.42 + ((index * 0.23) % 0.84),
      );
      const group = new THREE.Group();
      group.rotation.copy(rotation);
      world.add(group);

      const points = Array.from({ length: 161 }, (_, pointIndex) => {
        const angle = (pointIndex / 160) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      });
      const ring = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color: index % 2 === 0 ? 0xff7047 : 0xb898ff,
          opacity: index === this.selectedIndex ? 0.34 : 0.18,
          transparent: true,
        }),
      );
      group.add(ring);

      const planetColor = palette[index % palette.length];
      const texture = this.createSurfaceTexture(
        experience.id,
        '#21102d',
        planetColor,
        index % 2 === 0 ? '#ffd05f' : '#e8d3ff',
      );
      const material = new THREE.MeshStandardMaterial({
        bumpMap: texture,
        bumpScale: 0.055,
        map: texture,
        metalness: 0.04,
        roughness: 0.7,
      });
      const planet = new THREE.Mesh(sphereGeometry, material);
      planet.scale.setScalar(size);
      planet.userData['index'] = index;
      group.add(planet);

      return {
        angle: tilt,
        baseRotation: rotation.clone(),
        group,
        index,
        planet,
        radius,
        ring,
        size,
        speed,
      };
    });
  }

  private createStarfield(scene: THREE.Scene): void {
    const random = this.seededRandom(8147);
    const positions: number[] = [];
    for (let index = 0; index < 420; index += 1) {
      const radius = 12 + random() * 18;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      );
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    scene.add(
      new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
          color: 0xd9c8ff,
          opacity: 0.62,
          size: 0.035,
          sizeAttenuation: true,
          transparent: true,
        }),
      ),
    );
  }

  private createSurfaceTexture(key: string, base: string, accent: string, hot: string): THREE.CanvasTexture {
    const surface = document.createElement('canvas');
    surface.width = 512;
    surface.height = 256;
    const context = surface.getContext('2d');
    if (!context) {
      throw new Error('Canvas 2D context unavailable');
    }

    const random = this.seededRandom(
      [...key].reduce((sum, character) => sum + character.charCodeAt(0), 91),
    );
    context.fillStyle = base;
    context.fillRect(0, 0, surface.width, surface.height);

    if (key === 'sun') {
      context.globalCompositeOperation = 'screen';
      for (let filament = 0; filament < 140; filament += 1) {
        const x = random() * 512;
        const y = random() * 256;
        const length = 18 + random() * 96;
        context.strokeStyle = this.hexToRgba(hot, 0.04 + random() * 0.2);
        context.lineWidth = 0.6 + random() * 3.2;
        context.beginPath();
        context.moveTo(x, y);
        context.bezierCurveTo(
          x + length * 0.25,
          y - 22 + random() * 44,
          x + length * 0.72,
          y - 30 + random() * 60,
          x + length,
          y - 18 + random() * 36,
        );
        context.stroke();
      }
      context.globalCompositeOperation = 'source-over';
    } else {
      for (let band = 0; band < 34; band += 1) {
        const y = band * 8 + Math.sin(band * 1.7) * 5;
        context.fillStyle = this.hexToRgba(accent, 0.08 + random() * 0.2);
        context.fillRect(0, y, 512, 3 + random() * 8);
      }
    }

    for (let spot = 0; spot < 96; spot += 1) {
      const x = random() * 512;
      const y = random() * 256;
      const radius = 3 + random() * (key === 'sun' ? 28 : 13);
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, this.hexToRgba(hot, 0.12 + random() * 0.34));
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }

    const texture = new THREE.CanvasTexture(surface);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.anisotropy = Math.min(8, this.renderer?.capabilities.getMaxAnisotropy() ?? 1);
    this.textures.push(texture);
    return texture;
  }

  private createGlowTexture(): THREE.CanvasTexture {
    const glow = document.createElement('canvas');
    glow.width = glow.height = 256;
    const context = glow.getContext('2d');
    if (!context) {
      throw new Error('Canvas 2D context unavailable');
    }
    const gradient = context.createRadialGradient(128, 128, 10, 128, 128, 126);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.18, 'rgba(255,125,62,.72)');
    gradient.addColorStop(0.55, 'rgba(255,52,34,.16)');
    gradient.addColorStop(1, 'rgba(255,20,20,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
    const texture = new THREE.CanvasTexture(glow);
    this.textures.push(texture);
    return texture;
  }

  private animate(): void {
    if (!this.renderer || !this.scene || !this.camera || !this.world || !this.sun) {
      return;
    }

    const clock = new THREE.Clock();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderFrame = () => {
      this.animationFrame = requestAnimationFrame(renderFrame);
      const delta = Math.min(clock.getDelta(), 0.05);

      this.bodies.forEach((body) => {
        if (!reducedMotion) {
          body.angle += delta * body.speed;
          body.planet.rotation.y += delta * (0.42 + body.index * 0.035);
          body.planet.rotation.x += delta * 0.07;
        }
        body.planet.position.set(
          Math.cos(body.angle) * body.radius,
          0,
          Math.sin(body.angle) * body.radius,
        );
        const active = body.index === this.hoveredIndex || body.index === this.selectedIndex;
        const targetScale = body.size * (active ? 1.38 : 1);
        body.planet.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, targetScale),
          reducedMotion ? 1 : 0.14,
        );
        const lineMaterial = body.ring.material as THREE.LineBasicMaterial;
        lineMaterial.opacity += ((active ? 0.48 : 0.18) - lineMaterial.opacity) * 0.08;
      });

      if (!reducedMotion) {
        this.sun!.rotation.y += delta * 0.13;
        this.sun!.rotation.x = Math.sin(clock.elapsedTime * 0.21) * 0.08;
        this.world!.rotation.y += delta * 0.018;
      }
      this.updateLabels();
      this.renderer!.render(this.scene!, this.camera!);
    };
    renderFrame();
  }

  private updateCamera(): void {
    if (!this.camera) {
      return;
    }
    const cosPitch = Math.cos(this.pitch);
    this.camera.position.set(
      this.distance * Math.sin(this.yaw) * cosPitch,
      this.distance * Math.sin(this.pitch),
      this.distance * Math.cos(this.yaw) * cosPitch,
    );
    this.camera.lookAt(0, 0, 0);
  }

  private updateHover(event: PointerEvent): void {
    if (!this.camera) {
      return;
    }
    const bounds = this.canvasRef.nativeElement.getBoundingClientRect();
    const pointer = new THREE.Vector2(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(pointer, this.camera);
    const hit = this.raycaster.intersectObjects(
      this.bodies.map((body) => body.planet),
      false,
    )[0];
    const index = hit?.object.userData['index'];
    this.setHoveredIndex(typeof index === 'number' ? index : null);
  }

  private setHoveredIndex(index: number | null): void {
    this.hoveredIndex = index;
    this.labelNodes.forEach((label, labelIndex) => {
      label.classList.toggle('orbit-label--hovered', labelIndex === index);
    });
  }

  private updateLabels(): void {
    if (!this.camera) {
      return;
    }
    const viewport = this.viewportRef.nativeElement;
    const vector = new THREE.Vector3();
    this.bodies.forEach((body, index) => {
      const label = this.labelNodes[index];
      if (!label) {
        return;
      }
      body.planet.getWorldPosition(vector);
      vector.project(this.camera!);
      const rawX = (vector.x * 0.5 + 0.5) * viewport.clientWidth;
      const rawY = (-vector.y * 0.5 + 0.5) * viewport.clientHeight;
      const halfWidth = Math.max(34, label.offsetWidth / 2);
      const halfHeight = Math.max(18, label.offsetHeight / 2);
      const x = THREE.MathUtils.clamp(rawX, halfWidth + 8, viewport.clientWidth - halfWidth - 8);
      const y = THREE.MathUtils.clamp(rawY, halfHeight + 8, viewport.clientHeight - halfHeight - 8);
      label.style.left = `${x}px`;
      label.style.top = `${y}px`;
      label.style.opacity = vector.z > 1 ? '0' : '1';
      label.style.zIndex = `${Math.max(1, Math.round((1 - vector.z) * 10))}`;
    });
  }

  private seededRandom(seed: number): () => number {
    return () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  private hexToRgba(hex: string, alpha: number): string {
    const value = Number.parseInt(hex.slice(1), 16);
    return `rgba(${(value >> 16) & 255},${(value >> 8) & 255},${value & 255},${alpha})`;
  }
}
