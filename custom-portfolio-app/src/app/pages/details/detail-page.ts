import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import type { Subscription } from 'rxjs';
import type { DetailImageContent, DetailPageContent } from '../../content/experience.model';
import { GENERATED_DETAILS } from '../../generated/atlas.generated';

interface MilkyWayBackgroundHandle {
  destroy(): void;
}

interface MilkyWayBackgroundApi {
  mount(canvas: HTMLCanvasElement): MilkyWayBackgroundHandle;
}

declare global {
  interface Window {
    IlMaxoneMilkyWayBackground?: MilkyWayBackgroundApi;
  }
}

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail-page.html',
  styleUrl: './detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cosmicBackground') private cosmicBackground?: ElementRef<HTMLCanvasElement>;
  private static backgroundScriptLoader?: Promise<void>;
  readonly details = GENERATED_DETAILS;
  detail: DetailPageContent | undefined;
  expandedImage: DetailImageContent | undefined;
  private backgroundHandle?: MilkyWayBackgroundHandle;
  private destroyed = false;
  private readonly isBrowser: boolean;
  private readonly routeSubscription: Subscription;

  constructor(
    route: ActivatedRoute,
    private readonly router: Router,
    private readonly changeDetector: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.routeSubscription = route.paramMap.subscribe(params => {
      const slug = params.get('detail');
      this.detail = slug ? this.details.find(candidate => candidate.slug === slug) : undefined;
      this.changeDetector.markForCheck();

      if (slug && !this.detail) {
        void this.router.navigateByUrl('/');
      }
    });
  }

  ngAfterViewInit(): void {
    if (
      !this.isBrowser ||
      !this.cosmicBackground ||
      typeof WebGLRenderingContext === 'undefined'
    ) {
      return;
    }
    void this.mountCosmicBackground();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.backgroundHandle?.destroy();
    this.routeSubscription.unsubscribe();
  }

  openImage(image: DetailImageContent): void {
    this.expandedImage = image;
    this.changeDetector.markForCheck();
  }

  closeImage(): void {
    this.expandedImage = undefined;
    this.changeDetector.markForCheck();
  }

  @HostListener('document:keydown.escape')
  closeImageWithKeyboard(): void {
    if (this.expandedImage) {
      this.closeImage();
    }
  }

  private async mountCosmicBackground(): Promise<void> {
    try {
      await this.loadBackgroundScript();
      if (this.destroyed || !this.cosmicBackground || !window.IlMaxoneMilkyWayBackground) {
        return;
      }
      this.backgroundHandle = window.IlMaxoneMilkyWayBackground.mount(
        this.cosmicBackground.nativeElement,
      );
    } catch {
      this.cosmicBackground?.nativeElement.classList.add('detail-page__cosmos--unavailable');
    }
  }

  private loadBackgroundScript(): Promise<void> {
    if (window.IlMaxoneMilkyWayBackground) {
      return Promise.resolve();
    }
    if (!DetailPageComponent.backgroundScriptLoader) {
      DetailPageComponent.backgroundScriptLoader = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/webgl/milky-way-background.js';
        script.async = true;
        script.dataset['milkyWayBackground'] = 'true';
        script.addEventListener('load', () => resolve(), { once: true });
        script.addEventListener('error', () => reject(new Error('WebGL background unavailable')), {
          once: true,
        });
        document.head.append(script);
      });
    }
    return DetailPageComponent.backgroundScriptLoader;
  }
}
