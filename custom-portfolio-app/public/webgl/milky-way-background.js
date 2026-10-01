/*
 * Sfondo WebGL statico per le pagine di approfondimento.
 * Ispirazione astronomica e proporzioni relative:
 * - https://science.nasa.gov/solar-system/planets/
 * - https://science.nasa.gov/resource/solar-system-sizes/
 *
 * La rappresentazione è artistica: raggi e distanze sono compressi per lasciare
 * leggibili i contenuti. Colori e luminosità derivano sempre dalla palette CSS.
 */
(function registerMilkyWayBackground(global) {
  'use strict';

  if (global.IlMaxoneMilkyWayBackground) {
    return;
  }

  const vertexShaderSource = `
    attribute vec2 a_position;

    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision highp float;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec3 u_space;
    uniform vec3 u_text;
    uniform vec3 u_accent;
    uniform vec3 u_hot;
    uniform vec3 u_secondary;

    const float PI = 3.14159265359;

    mat2 rotate2d(float angle) {
      float sine = sin(angle);
      float cosine = cos(angle);
      return mat2(cosine, -sine, sine, cosine);
    }

    float hash21(vec2 point) {
      point = fract(point * vec2(123.34, 456.21));
      point += dot(point, point + 45.32);
      return fract(point.x * point.y);
    }

    vec2 orbitPosition(vec2 center, float radius, float angle) {
      vec2 position = vec2(cos(angle) * radius, sin(angle) * radius * 0.38);
      return center + rotate2d(-0.18) * position;
    }

    float orbitLine(vec2 point, vec2 center, float radius) {
      vec2 local = rotate2d(0.18) * (point - center);
      float metric = length(vec2(local.x, local.y / 0.38));
      return 1.0 - smoothstep(0.0, 0.006, abs(metric - radius));
    }

    void paintPlanet(
      inout vec3 color,
      inout float alpha,
      vec2 point,
      vec2 center,
      float radius,
      vec3 base,
      vec3 detail,
      float bands,
      float storm
    ) {
      vec2 local = point - center;
      float distanceFromCenter = length(local);
      if (distanceFromCenter >= radius) {
        return;
      }

      float normalizedRadius = distanceFromCenter / radius;
      float depth = sqrt(max(0.0, 1.0 - normalizedRadius * normalizedRadius));
      vec3 normal = normalize(vec3(local / radius, depth));
      vec3 lightDirection = normalize(vec3(-0.72, 0.58, 1.15));
      float diffuse = max(dot(normal, lightDirection), 0.0);
      float rim = pow(1.0 - depth, 2.2);
      float textureMix = 0.18;

      if (bands > 0.5) {
        float bandFlow = sin(local.y / radius * bands + sin(local.x / radius * 5.0 + u_time * 0.05) * 1.4);
        textureMix = 0.32 + bandFlow * 0.18;
      } else {
        float surfaceNoise = hash21(floor((local / radius + 1.0) * 20.0));
        textureMix = 0.12 + surfaceNoise * 0.28;
      }

      if (storm > 0.5) {
        vec2 stormPoint = (local / radius - vec2(0.28, -0.2)) * vec2(1.0, 2.6);
        float stormMask = 1.0 - smoothstep(0.16, 0.25, length(stormPoint));
        textureMix = mix(textureMix, 0.88, stormMask);
      }

      vec3 surface = mix(base, detail, clamp(textureMix, 0.0, 1.0));
      surface *= 0.26 + diffuse * 0.92;
      surface += detail * rim * 0.18;
      float edge = 1.0 - smoothstep(0.86, 1.0, normalizedRadius);

      color = mix(color, surface, edge * 0.92);
      alpha = max(alpha, edge * 0.76);
    }

    void main() {
      vec2 resolution = max(u_resolution, vec2(1.0));
      vec2 point = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
      vec3 color = u_space;
      float alpha = 0.0;

      vec2 galaxyPoint = rotate2d(u_time * 0.004) * point;
      float galacticWave = galaxyPoint.y + sin(galaxyPoint.x * 2.4) * 0.075;
      float galacticBand = exp(-abs(galacticWave) * 4.2) * (1.0 - smoothstep(0.05, 2.0, abs(galaxyPoint.x)));
      float dust = hash21(floor(galaxyPoint * 95.0 + u_time * 0.01));
      vec3 galaxyColor = mix(u_secondary, u_accent, 0.28 + dust * 0.24);
      color = mix(color, galaxyColor, galacticBand * (0.055 + dust * 0.055));
      alpha = max(alpha, galacticBand * 0.18);

      vec2 starGrid = point * 138.0;
      vec2 starCell = floor(starGrid);
      vec2 starLocal = fract(starGrid) - 0.5;
      float starSeed = hash21(starCell);
      float starPresent = step(0.9925, starSeed);
      float starSizeSeed = hash21(starCell + 37.17);
      float starRadius = mix(0.045, 0.15, pow(starSizeSeed, 4.0));
      float starPoint = (1.0 - smoothstep(starRadius, starRadius + 0.065, length(starLocal))) * starPresent;
      float starTemperature = hash21(starCell + 81.43);
      vec3 starColor = mix(u_text, u_hot, smoothstep(0.78, 1.0, starTemperature) * 0.28);
      starColor = mix(
        starColor,
        u_secondary,
        (1.0 - smoothstep(0.0, 0.2, starTemperature)) * 0.22
      );
      float starBrightness = 0.28 + starSizeSeed * 0.26;
      color += starColor * starPoint * starBrightness;
      alpha = max(alpha, starPoint * (0.24 + starSizeSeed * 0.18));

      vec2 center = vec2(0.38, -0.12);
      for (int orbitIndex = 1; orbitIndex <= 8; orbitIndex += 1) {
        float radius = 0.19 + float(orbitIndex) * 0.135;
        float line = orbitLine(point, center, radius);
        color = mix(color, mix(u_secondary, u_accent, mod(float(orbitIndex), 2.0) * 0.35), line * 0.17);
        alpha = max(alpha, line * 0.2);
      }

      float sunDistance = length(point - center);
      float sunGlow = exp(-sunDistance * 8.5);
      color += mix(u_accent, u_hot, 0.52) * sunGlow * 0.34;
      alpha = max(alpha, sunGlow * 0.42);
      paintPlanet(color, alpha, point, center, 0.118, u_accent, u_hot, 18.0, 0.0);

      float time = u_time * 0.045;
      vec2 mercury = orbitPosition(center, 0.325, time * 1.6 + 0.3);
      vec2 venus = orbitPosition(center, 0.46, time * 1.28 + 1.5);
      vec2 earth = orbitPosition(center, 0.595, time * 1.02 + 2.8);
      vec2 mars = orbitPosition(center, 0.73, time * 0.84 + 4.2);
      vec2 jupiter = orbitPosition(center, 0.865, time * 0.52 + 5.4);
      vec2 saturn = orbitPosition(center, 1.0, time * 0.41 + 0.9);
      vec2 uranus = orbitPosition(center, 1.135, time * 0.31 + 2.2);
      vec2 neptune = orbitPosition(center, 1.27, time * 0.24 + 3.6);

      vec2 saturnLocal = rotate2d(0.22) * (point - saturn);
      float saturnRingMetric = length(vec2(saturnLocal.x, saturnLocal.y / 0.19));
      float saturnRingBounds = smoothstep(0.067, 0.071, saturnRingMetric)
        * (1.0 - smoothstep(0.113, 0.119, saturnRingMetric));
      float cassiniDivision = smoothstep(0.0018, 0.0042, abs(saturnRingMetric - 0.099));
      float enckeGap = smoothstep(0.0006, 0.0017, abs(saturnRingMetric - 0.109));
      float ringStrands = clamp(
        0.62
          + sin(saturnRingMetric * 920.0) * 0.2
          + sin(saturnRingMetric * 360.0) * 0.12,
        0.24,
        0.94
      );
      float saturnRing = saturnRingBounds * cassiniDivision * enckeGap * ringStrands;
      float frontRing = step(saturnLocal.y, 0.0);
      float rearRing = saturnRing * (1.0 - frontRing);
      vec3 saturnRingColor = mix(u_text, u_hot, 0.32 + ringStrands * 0.18);
      color = mix(color, saturnRingColor, rearRing * 0.42);
      alpha = max(alpha, rearRing * 0.38);

      paintPlanet(color, alpha, point, mercury, 0.018, mix(u_space, u_text, 0.38), u_text, 0.0, 0.0);
      paintPlanet(color, alpha, point, venus, 0.029, mix(u_accent, u_hot, 0.35), u_hot, 17.0, 0.0);
      paintPlanet(color, alpha, point, earth, 0.031, mix(u_secondary, u_space, 0.32), mix(u_text, u_secondary, 0.48), 0.0, 0.0);
      paintPlanet(color, alpha, point, mars, 0.023, mix(u_accent, u_space, 0.22), u_accent, 0.0, 0.0);
      paintPlanet(color, alpha, point, jupiter, 0.066, mix(u_hot, u_space, 0.18), mix(u_text, u_accent, 0.4), 30.0, 1.0);
      paintPlanet(color, alpha, point, saturn, 0.057, mix(u_hot, u_space, 0.14), mix(u_text, u_hot, 0.38), 26.0, 0.0);
      float foregroundRing = saturnRing * frontRing;
      color = mix(color, saturnRingColor, foregroundRing * 0.72);
      alpha = max(alpha, foregroundRing * 0.62);
      paintPlanet(color, alpha, point, uranus, 0.041, mix(u_secondary, u_text, 0.48), u_text, 11.0, 0.0);
      paintPlanet(color, alpha, point, neptune, 0.04, mix(u_secondary, u_space, 0.3), u_secondary, 15.0, 0.0);

      gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.78));
    }
  `;

  function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader) || 'Errore shader WebGL';
      gl.deleteShader(shader);
      throw new Error(message);
    }
    return shader;
  }

  function createProgram(gl) {
    const program = gl.createProgram();
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(program) || 'Errore programma WebGL';
      gl.deleteProgram(program);
      throw new Error(message);
    }
    return program;
  }

  function parseColor(value) {
    const parser = document.createElement('canvas').getContext('2d');
    parser.fillStyle = '#000000';
    parser.fillStyle = value.trim();
    const normalized = parser.fillStyle;
    if (normalized.startsWith('#')) {
      const hex = normalized.slice(1);
      const expanded = hex.length === 3
        ? hex.split('').map(character => character + character).join('')
        : hex.slice(0, 6);
      const integer = Number.parseInt(expanded, 16);
      return [((integer >> 16) & 255) / 255, ((integer >> 8) & 255) / 255, (integer & 255) / 255];
    }
    const channels = normalized.match(/[\d.]+/g)?.slice(0, 3).map(Number) || [0, 0, 0];
    return channels.map(channel => channel / 255);
  }

  function luminance(color) {
    return color[0] * 0.2126 + color[1] * 0.7152 + color[2] * 0.0722;
  }

  function mount(canvas) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError('Il fondale richiede un elemento canvas');
    }

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: 'high-performance',
      premultipliedAlpha: true,
    });
    if (!gl) {
      throw new Error('WebGL non disponibile');
    }

    const program = createProgram(gl);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.useProgram(program);
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      space: gl.getUniformLocation(program, 'u_space'),
      text: gl.getUniformLocation(program, 'u_text'),
      accent: gl.getUniformLocation(program, 'u_accent'),
      hot: gl.getUniformLocation(program, 'u_hot'),
      secondary: gl.getUniformLocation(program, 'u_secondary'),
    };

    let destroyed = false;
    let frame = 0;
    let visible = true;
    let width = 1;
    let height = 1;
    const startedAt = performance.now();
    const reducedMotion = global.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updatePalette = () => {
      const styles = getComputedStyle(document.documentElement);
      const space = parseColor(styles.getPropertyValue('--deep'));
      const text = parseColor(styles.getPropertyValue('--text-main'));
      const accent = parseColor(styles.getPropertyValue('--accent'));
      const hot = parseColor(styles.getPropertyValue('--accent-hot'));
      const secondary = parseColor(styles.getPropertyValue('--secondary'));
      gl.useProgram(program);
      gl.uniform3fv(uniforms.space, space);
      gl.uniform3fv(uniforms.text, text);
      gl.uniform3fv(uniforms.accent, accent);
      gl.uniform3fv(uniforms.hot, hot);
      gl.uniform3fv(uniforms.secondary, secondary);
      canvas.style.opacity = luminance(parseColor(styles.getPropertyValue('--page-bg'))) > 0.55
        ? '0.34'
        : '0.62';
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(global.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.round(bounds.width * pixelRatio));
      height = Math.max(1, Math.round(bounds.height * pixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uniforms.resolution, width, height);
    };

    const render = now => {
      gl.useProgram(program);
      gl.uniform1f(uniforms.time, reducedMotion ? 0 : (now - startedAt) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const animate = now => {
      if (destroyed) {
        return;
      }
      if (visible && document.visibilityState === 'visible') {
        render(now);
      }
      frame = global.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) {
        render(performance.now());
      }
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    intersectionObserver.observe(canvas);

    const paletteObserver = new MutationObserver(() => {
      updatePalette();
      if (reducedMotion) {
        render(performance.now());
      }
    });
    paletteObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-palette'],
    });

    resize();
    updatePalette();
    render(performance.now());
    if (!reducedMotion) {
      frame = global.requestAnimationFrame(animate);
    }

    return {
      destroy() {
        if (destroyed) {
          return;
        }
        destroyed = true;
        global.cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        paletteObserver.disconnect();
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
      },
    };
  }

  global.IlMaxoneMilkyWayBackground = { mount };
})(window);
