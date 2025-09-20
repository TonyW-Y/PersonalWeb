import {useEffect, useRef} from 'react';
import * as THREE from 'three';
// ✨ Postprocessing (comes with three/examples)
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const TWO_PI = Math.PI*2;
const clamp = THREE.MathUtils.clamp;

const polygonRadius = (theta:number, n:number, R:number) => {
  const m = ((theta%TWO_PI)+TWO_PI)%TWO_PI;
  const a = Math.PI/n;
  const k = Math.floor(m/(2*a));
  const local = m - (2*k+1)*a;
  const denom = Math.cos(local);
  const c = Math.cos(a);
  return R*(c/Math.max(denom, 1e-4));
};

export const PrismBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameId = useRef<number>();
  const prismRef = useRef<THREE.Mesh>();
  const ghostRef = useRef<THREE.Mesh>();
  const edgesRef = useRef<THREE.LineSegments>();
  const groupRef = useRef<THREE.Group>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  // postprocessing
  const composerRef = useRef<EffectComposer>();
  const bloomPassRef = useRef<UnrealBloomPass>();

  // rings
  const ringARef = useRef<THREE.Group>();
  const ringBRef = useRef<THREE.Group>();
  const ringAVy = useRef(0);
  const ringBVy = useRef(0);

  // Morph & motion
  const currentN = useRef(6);
  const targetN = useRef(6);
  const idlePhase = useRef(0);
  const scrollVel = useRef(0);

  const rotX = useRef(0);
  const rotY = useRef(0);
  const angVX = useRef(0);
  const angVY = useRef(0);

  // Materials/lights
  const matRef = useRef<THREE.MeshPhysicalMaterial>();
  const light1Ref = useRef<THREE.DirectionalLight>();
  const light2Ref = useRef<THREE.DirectionalLight>();

  // Orbs
  const orbParams = useRef<{r:number;ang:number;angSpeed:number;bobAmp:number;bobFreq:number;phase:number;zBase:number;scale:number;}[]>([]);
  let orbs:THREE.InstancedMesh|undefined;
  let orbMat:THREE.MeshStandardMaterial|undefined;

  // Stars
  let stars:THREE.Points|undefined;
  let starPos:Float32Array|undefined;
  const starVel = useRef<{vx:number;vy:number;vz:number;}[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(68, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 5.2;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95; // slightly lower base; bloom will add perceived brightness
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Postprocessing: RenderPass + UnrealBloomPass
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.0,   // strength (will animate)
      0.85,  // radius (spread)
      0.2    // threshold (what starts blooming)
    );
    composer.addPass(bloomPass);
    composerRef.current = composer;
    bloomPassRef.current = bloomPass;

    // Lights (a bit stronger for contrast)
    scene.add(new THREE.AmbientLight(0x0f1020, 0.55));
    const d1 = new THREE.DirectionalLight(0xffffff, 0.95); d1.position.set(1.6,1.3,1.2); scene.add(d1); light1Ref.current = d1;
    const d2 = new THREE.DirectionalLight(0x5870ff, 0.85); d2.position.set(-1.4,-1.2,-0.9); scene.add(d2); light2Ref.current = d2;

    // Root
    const root = new THREE.Group();
    scene.add(root);
    groupRef.current = root;

    // ---------- Prism ----------
    const radialSegs = 300;
    const height = 2.5;
    const baseRadius = 1.3;

    const vertCount = radialSegs*2+2;
    const fullPos = new Float32Array(vertCount*3);
    const fullNorm = new Float32Array(vertCount*3);
    const fullUV = new Float32Array(vertCount*2);
    const indices:number[] = [];

    const bottomCenterIdx = radialSegs*2;
    const topCenterIdx = radialSegs*2+1;

    for (let i=0;i<radialSegs;i++){
      const a0 = i, b0 = (i+1)%radialSegs, a1 = i+radialSegs, b1 = ((i+1)%radialSegs)+radialSegs;
      indices.push(a0, b0, a1,  b0, b1, a1);
    }
    const addCap = (isTop:boolean) => {
      const cIdx = isTop? topCenterIdx: bottomCenterIdx;
      const ring = isTop? radialSegs: 0;
      for (let i=0;i<radialSegs;i++){
        const a = ring+i, b = ring+((i+1)%radialSegs);
        if (isTop) indices.push(a,b,cIdx); else indices.push(cIdx,b,a);
      }
    };
    addCap(false); addCap(true);

    const geo = new THREE.BufferGeometry();
    geo.setIndex(indices);
    geo.setAttribute('position', new THREE.BufferAttribute(fullPos, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(fullNorm, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(fullUV, 2));

    const writeRings = (n:number, time:number) => {
      const breath = 1.0 + Math.sin(time*0.3)*0.01;
      const rippleFreq = 14;
      const rippleAmp = 0.012;
      for (let i=0;i<radialSegs;i++){
        const t = i/radialSegs*TWO_PI;
        const rPoly = polygonRadius(t, n, baseRadius)*breath;
        const ripple = 1.0 + rippleAmp*Math.sin(t*rippleFreq + Math.sin(time*0.6)*0.7);
        const r = rPoly*ripple;
        const x = Math.cos(t)*r;
        const y = Math.sin(t)*r;

        fullPos[(i*3)+0]=x; fullPos[(i*3)+1]=y; fullPos[(i*3)+2]=-height/2;
        const ti=(i+radialSegs)*3; fullPos[ti+0]=x; fullPos[ti+1]=y; fullPos[ti+2]=height/2;

        const u=(Math.cos(t)+1)/2, v=(Math.sin(t)+1)/2;
        fullUV[(i*2)+0]=u; fullUV[(i*2)+1]=v; const ui=(i+radialSegs)*2; fullUV[ui+0]=u; fullUV[ui+1]=v;

        const len=Math.hypot(x,y)||1;
        fullNorm[(i*3)+0]=x/len; fullNorm[(i*3)+1]=y/len; fullNorm[(i*3)+2]=0;
        fullNorm[ti+0]=x/len; fullNorm[ti+1]=y/len; fullNorm[ti+2]=0;
      }
      const bci=bottomCenterIdx*3, tci=topCenterIdx*3;
      fullPos[bci+0]=0; fullPos[bci+1]=0; fullPos[bci+2]=-height/2; fullNorm[bci+0]=0; fullNorm[bci+1]=0; fullNorm[bci+2]=-1;
      fullPos[tci+0]=0; fullPos[tci+1]=0; fullPos[tci+2]=height/2;  fullNorm[tci+0]=0; fullNorm[tci+1]=0; fullNorm[tci+2]=1;

      (geo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
      (geo.getAttribute('normal') as THREE.BufferAttribute).needsUpdate = true;
      (geo.getAttribute('uv') as THREE.BufferAttribute).needsUpdate = true;

      // keep edges in sync
      if (edgesRef.current){
        (edgesRef.current.geometry as THREE.EdgesGeometry).dispose();
        edgesRef.current.geometry = new THREE.EdgesGeometry(geo, 35);
      }
    };
    writeRings(currentN.current, 0);

    // Material — higher contrast + emissive for glow
    const material = new THREE.MeshPhysicalMaterial({
      color:0x6b71ff,
      emissive:new THREE.Color(0x3b43ff),
      emissiveIntensity:0.35,        // animated in loop
      transparent:true,
      opacity:0.995,
      metalness:1.0,
      roughness:0.08,
      clearcoat:1.0,
      clearcoatRoughness:0.03,
      sheen:0.8,
      sheenRoughness:0.45,
      sheenColor:new THREE.Color(0xbfc6ff),
      iridescence:1.0,
      iridescenceIOR:1.35,
      envMapIntensity:1.4,
      side:THREE.DoubleSide
    });
    matRef.current = material;

    const prism = new THREE.Mesh(geo, material);
    prism.scale.setScalar(0.5);      // smaller inner prism
    prismRef.current = prism;
    groupRef.current!.add(prism);

    // subtle edge outline for extra contrast
    const edgeGeom = new THREE.EdgesGeometry(geo, 35);
    const edgeMat = new THREE.LineBasicMaterial({color:0xdfe2ff, transparent:true, opacity:0.28});
    const edges = new THREE.LineSegments(edgeGeom, edgeMat);
    edges.scale.copy(prism.scale).multiplyScalar(1.002);
    edgesRef.current = edges;
    groupRef.current!.add(edges);

    // Ghost wireframe uses SAME geo (stays synced)
    const ghostMat = new THREE.MeshBasicMaterial({color:0x9aa0ff, wireframe:true, transparent:true, opacity:0.12});
    const ghost = new THREE.Mesh(geo, ghostMat);
    ghost.scale.setScalar(1.35);
    ghostRef.current = ghost;
    groupRef.current!.add(ghost);

    // ---------- Background halos ----------
    const ringMat = new THREE.MeshBasicMaterial({color:0xa9afff, transparent:true, opacity:0.07});
    const halo1 = new THREE.Mesh(new THREE.TorusGeometry(1.95,0.012,8,256), ringMat);
    const halo2 = new THREE.Mesh(new THREE.TorusGeometry(1.25,0.009,8,256), ringMat.clone());
    halo1.rotation.x = Math.PI/2.4;
    halo2.rotation.y = Math.PI/3.2;
    groupRef.current!.add(halo1, halo2);
    const halos = [halo1, halo2];

    // ---------- Two scrolling-reactive rings ----------
    const ringRadiusBase = baseRadius*ghost.scale.x / 1.6;
    const mkRing = (radius:number, tube:number, tiltX:number, tiltY:number, mat:THREE.Material) => {
      const g = new THREE.Group();
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 12, 320), mat);
      mesh.rotation.x = tiltX;
      mesh.rotation.y = tiltY;
      g.add(mesh);
      groupRef.current!.add(g);
      return g;
    };
    const ringMatSpinA = new THREE.MeshStandardMaterial({color:0xb7bbff, emissive:0x3a40ff, emissiveIntensity:0.6, metalness:0.8, roughness:0.25});
    const ringMatSpinB = new THREE.MeshStandardMaterial({color:0x8aa0ff, emissive:0x2230ff, emissiveIntensity:0.5, metalness:0.75, roughness:0.3});
    const ringA = mkRing(ringRadiusBase*1.06, 0.028, Math.PI/7, 0, ringMatSpinA);
    const ringB = mkRing(ringRadiusBase*1.22, 0.022, -Math.PI/9, Math.PI/6, ringMatSpinB);
    ringARef.current = ringA;
    ringBRef.current = ringB;

    // ---------- Orbs ----------
    const orbCount = 140;
    const orbGeo = new THREE.SphereGeometry(0.022, 10, 10);
    orbMat = new THREE.MeshStandardMaterial({color:0x9aa0ff, emissive:0x2b2f7a, emissiveIntensity:0.8, metalness:0.45, roughness:0.32});
    orbs = new THREE.InstancedMesh(orbGeo, orbMat, orbCount);
    {
      const dummy = new THREE.Object3D();
      orbParams.current = [];
      for (let i=0;i<orbCount;i++){
        const r = 1.6 + Math.random()*1.6;
        const ang = Math.random()*TWO_PI;
        const angSpeed = 0.03 + Math.random()*0.06;
        const bobAmp = 0.12 + Math.random()*0.20;
        const bobFreq = 0.15 + Math.random()*0.25;
        const phase = Math.random()*TWO_PI;
        const zBase = (Math.random()*2-1)*0.8;
        const scale = 0.7 + Math.random()*0.9;
        orbParams.current.push({r, ang, angSpeed, bobAmp, bobFreq, phase, zBase, scale});
        const x = Math.cos(ang)*r, y = Math.sin(ang)*r, z = zBase;
        dummy.position.set(x,y,z);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        orbs.setMatrixAt(i, dummy.matrix);
      }
      groupRef.current!.add(orbs);
    }

    // ---------- Starfield (additive for sparkle) ----------
    const starCount = 3000;
    const sGeo = new THREE.BufferGeometry();
    starPos = new Float32Array(starCount*3);
    starVel.current = [];
    for (let i=0;i<starCount;i++){
      starPos[i*3+0] = (Math.random()*2-1)*7.2;
      starPos[i*3+1] = (Math.random()*2-1)*7.2;
      starPos[i*3+2] = -2.8 - Math.random()*4.6;
      starVel.current.push({vx:(Math.random()*2-1)*0.002, vy:(Math.random()*2-1)*0.002, vz:(Math.random()*2-1)*0.001});
    }
    sGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const sMat = new THREE.PointsMaterial({
      color:0xbfc7ff,               // brighter base
      size:0.013,
      transparent:true,
      depthWrite:false,
      blending:THREE.AdditiveBlending // ✨ makes stars “shine”
    });
    stars = new THREE.Points(sGeo, sMat);
    scene.add(stars);

    // Scroll handler
    let lastY = window.scrollY;
    let lastT = performance.now();
    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      lastT = now;

      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;

      const v = (dy/(dt/1000));
      scrollVel.current = scrollVel.current*0.93 + v*0.07;

      // subtle sides morphing
      const deltaSides = clamp(scrollVel.current/3200, -0.09, 0.09);
      targetN.current = clamp(targetN.current + deltaSides, 3, 10);

      // base prism angular push
      angVX.current += clamp(v/140000, -0.00055, 0.00055);
      angVY.current += clamp(v/110000, -0.00075, 0.00075);

      // ring spin kick (responds to scroll)
      const kick = clamp(v/60000, -0.02, 0.02);
      ringAVy.current += kick;
      ringBVy.current -= kick*0.8; // counter-feel
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bloomPass.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, {passive:true});
    window.addEventListener('resize', handleResize);

    // Animate
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);
      const t = performance.now()/1000;

      // sides drift when idle
      if (Math.abs(scrollVel.current) < 8){
        idlePhase.current += 0.0013;
        const drift = Math.sin(idlePhase.current)*0.0085;
        targetN.current = clamp(targetN.current + drift, 3, 10);
      }

      // morph easing
      const settle = 1 - Math.exp(-0.0115);
      currentN.current += (targetN.current - currentN.current)*settle;
      writeRings(currentN.current, t);

      // rotation (damped)
      angVX.current += Math.sin(t*0.14)*0.000035;
      angVY.current += 0.00011;
      angVX.current *= 0.9955;
      angVY.current *= 0.9955;
      rotX.current += angVX.current;
      rotY.current += angVY.current;

      if (prismRef.current){ prismRef.current.rotation.set(rotX.current, rotY.current, 0); }
      if (ghostRef.current){ ghostRef.current.rotation.set(rotX.current*0.9, rotY.current*0.9, 0); }
      if (edgesRef.current){ edgesRef.current.rotation.set(rotX.current, rotY.current, 0); }

      if (groupRef.current){
        groupRef.current.position.x = Math.sin(t*0.11)*0.075;
        groupRef.current.position.y = Math.cos(t*0.10)*0.06;
      }

      // orbs
      if (orbs){
        const dummy = new THREE.Object3D();
        for (let i=0;i<orbParams.current.length;i++){
          const p = orbParams.current[i];
          p.ang += p.angSpeed*0.005;
          const r = p.r*(1.0 + 0.02*Math.sin(t*0.2 + p.phase));
          const x = Math.cos(p.ang)*r;
          const y = Math.sin(p.ang)*r;
          const z = p.zBase + Math.sin(t*p.bobFreq + p.phase)*p.bobAmp;
          dummy.position.set(x,y,z);
          const s = p.scale*(1.0 + 0.03*Math.sin(t*0.6 + p.phase));
          dummy.scale.setScalar(s);
          dummy.updateMatrix();
          orbs.setMatrixAt(i, dummy.matrix);
        }
        orbs.instanceMatrix.needsUpdate = true;

        const vabs = Math.min(Math.abs(scrollVel.current), 2000);
        const vigor = vabs/2000;
        const orbHue = (0.62 + 0.10*vigor + 0.02*Math.sin(t*1.2))%1;
        if (orbMat){
          (orbMat.color as THREE.Color).setHSL(orbHue, 0.55, 0.62);
          orbMat.emissiveIntensity = 0.6 + 0.4*vigor;
        }
      }

      // stars drift
      if (stars && starPos){
        const posAttr = (stars.geometry.getAttribute('position') as THREE.BufferAttribute);
        for (let i=0;i<starVel.current.length;i++){
          const idx = i*3;
          starPos[idx+0] += starVel.current[i].vx;
          starPos[idx+1] += starVel.current[i].vy;
          starPos[idx+2] += starVel.current[i].vz;
          if (starPos[idx+0] > 7.2) starPos[idx+0] = -7.2;
          if (starPos[idx+0] < -7.2) starPos[idx+0] = 7.2;
          if (starPos[idx+1] > 7.2) starPos[idx+1] = -7.2;
          if (starPos[idx+1] < -7.2) starPos[idx+1] = 7.2;
          if (starPos[idx+2] > -0.8) starPos[idx+2] = -7.6;
          if (starPos[idx+2] < -7.8) starPos[idx+2] = -1.0;
        }
        posAttr.needsUpdate = true;

        // reactive tint for stars (also helps bloom)
        const mat = stars.material as THREE.PointsMaterial;
        const tmp = new THREE.Color();
        const vabs = Math.min(Math.abs(scrollVel.current), 2000);
        const vigor = vabs/2000;
        const baseHue = 0.62;
        const hue = (baseHue + 0.15*vigor + 0.02*Math.sin(t*1.5))%1;
        tmp.setHSL(hue, 0.6, 0.78);
        mat.color.copy(tmp);
      }

      // color shimmer & emissive boost on prism
      const vabs = Math.min(Math.abs(scrollVel.current), 2000);
      const vigor = vabs/2000;
      const hueBase = 0.66;
      const hueShift = 0.055*vigor + 0.01*Math.sin(t*1.1);
      const hue = (hueBase + hueShift + 1)%1;

      if (matRef.current){
        const c = new THREE.Color();
        c.setHSL(hue, 0.8, 0.56);
        matRef.current.color.copy(c);
        matRef.current.emissiveIntensity = 0.35 + 0.55*vigor; // ✨ glow up with scroll
        matRef.current.iridescenceThicknessRange = [280, 640+260*vigor];
        matRef.current.envMapIntensity = 1.3 + 0.5*vigor;
      }

      if (light1Ref.current && light2Ref.current){
        const tw1 = 0.018*Math.sin(t*2.0);
        const tw2 = 0.018*Math.cos(t*1.8+0.6);
        light1Ref.current.intensity = 0.9 + 0.35*vigor + tw1*vigor;
        light2Ref.current.intensity = 0.82 + 0.28*vigor + tw2*vigor;
        light1Ref.current.color.setHSL((hue+0.012)%1, 0.65, 0.75);
        light2Ref.current.color.setHSL((hue+0.10)%1, 0.7, 0.64);
      }

      // ring spins: base drift + scroll-driven velocity, damped
      ringAVy.current *= 0.965;
      ringBVy.current *= 0.965;
      if (ringARef.current){
        ringARef.current.rotation.y += 0.0022 + ringAVy.current;
        ringARef.current.rotation.x += 0.0005*Math.cos(t*0.9);
      }
      if (ringBRef.current){
        ringBRef.current.rotation.y -= 0.0018 + ringBVy.current;
        ringBRef.current.rotation.x += 0.0004*Math.sin(t*1.1);
      }

      for (const h of halos){ h.rotation.z += 0.0008; }

      // ✨ Render with bloom
      if (composerRef.current) composerRef.current.render();

      // gently animate bloom strength with scroll vigor
      if (bloomPassRef.current){
        bloomPassRef.current.strength = 0.8 + 0.9*vigor; // 0.8..1.7
        bloomPassRef.current.radius = 0.7 + 0.3*Math.sin(t*0.4); // subtle breathing
        // bloomPassRef.current.threshold stays at 0.2
      }

      scrollVel.current *= 0.94;
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (frameId.current) cancelAnimationFrame(frameId.current);
      if (mountRef.current && renderer.domElement.parentElement === mountRef.current){
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry){ mesh.geometry.dispose(); }
        const m = mesh.material as THREE.Material|THREE.Material[];
        if (Array.isArray(m)){ m.forEach((mm)=>mm.dispose()); } else if (m){ m.dispose(); }
      });
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{position:'fixed', top:0, left:0, width:'100%', height:'100%', zIndex:-1, opacity:0.45, pointerEvents:'none'}}
    />
  );
};
