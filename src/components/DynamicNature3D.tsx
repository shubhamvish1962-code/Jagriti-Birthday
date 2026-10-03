'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DynamicNature3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(0);
  const scrollVelocityRef = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);

  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (totalScroll > 0) {
        scrollRef.current = Math.min(1, Math.max(0, currentY / totalScroll));
      }

      const dt = Math.max(1, now - lastScrollTime.current);
      const dy = Math.abs(currentY - lastScrollY.current);
      scrollVelocityRef.current = THREE.MathUtils.lerp(
        scrollVelocityRef.current,
        Math.min(dy / dt, 5.0),
        0.3
      );

      lastScrollY.current = currentY;
      lastScrollTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ── 1. Scene & Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10.5);

    // ── 2. Renderer ──
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ── 3. Atmospheric Lights ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const pinkLight = new THREE.PointLight(0xf472b6, 45, 25);
    pinkLight.position.set(5, 4, 6);
    scene.add(pinkLight);

    const emeraldLight = new THREE.PointLight(0x52b788, 38, 25);
    emeraldLight.position.set(-5, -2, 5);
    scene.add(emeraldLight);

    const lanternLight = new THREE.PointLight(0xfbbf24, 45, 22);
    lanternLight.position.set(0, 0, 2);
    scene.add(lanternLight);

    // ── 4. Main Nature Botanical Droplet & Blossom Sculpture ──
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // A. Central Glistening Water Pearl Droplet
    const dropletGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const posAttr = dropletGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      if (y > 0) {
        posAttr.setY(i, y * 1.25);
        posAttr.setX(i, posAttr.getX(i) * 0.88);
        posAttr.setZ(i, posAttr.getZ(i) * 0.88);
      }
    }
    dropletGeo.computeVertexNormals();

    const dropletMat = new THREE.MeshPhysicalMaterial({
      color: 0xfce7f3,
      emissive: 0x1b4332,
      emissiveIntensity: 0.25,
      roughness: 0.04,
      metalness: 0.08,
      transmission: 0.94,
      ior: 1.333,
      thickness: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      specularIntensity: 1.5,
      flatShading: true,
    });
    const dropletMesh = new THREE.Mesh(dropletGeo, dropletMat);
    rootGroup.add(dropletMesh);

    // B. Inner Warm Glowing Firefly Core
    const fireflyGeo = new THREE.OctahedronGeometry(0.55, 0);
    const fireflyMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.8,
      roughness: 0.1,
      metalness: 0.8,
      wireframe: true,
    });
    const fireflyMesh = new THREE.Mesh(fireflyGeo, fireflyMat);
    rootGroup.add(fireflyMesh);

    // C. Sculpted Baby Pink Flower Petals
    const petalGroup = new THREE.Group();
    rootGroup.add(petalGroup);

    const petalCount = 6;
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.quadraticCurveTo(0.65, 1.2, 0, 2.2);
    petalShape.quadraticCurveTo(-0.65, 1.2, 0, 0);

    const petalExtrudeSettings = {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };
    const petalGeo = new THREE.ExtrudeGeometry(petalShape, petalExtrudeSettings);
    const petalMat = new THREE.MeshPhysicalMaterial({
      color: 0xfbcfe8,
      emissive: 0xf472b6,
      emissiveIntensity: 0.45,
      roughness: 0.18,
      metalness: 0.12,
      clearcoat: 0.85,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < petalCount; i++) {
      const petalMesh = new THREE.Mesh(petalGeo, petalMat);
      const angle = (i / petalCount) * Math.PI * 2;
      petalMesh.rotation.z = angle;
      petalMesh.rotation.x = 0.52;
      petalMesh.position.y = -0.28;
      petalGroup.add(petalMesh);
    }

    // D. Emerald Green Monstera Leaf Wings
    const leafGroup = new THREE.Group();
    rootGroup.add(leafGroup);

    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.quadraticCurveTo(0.9, 1.4, 0, 2.8);
    leafShape.quadraticCurveTo(-0.9, 1.4, 0, 0);

    const leafGeo = new THREE.ExtrudeGeometry(leafShape, petalExtrudeSettings);
    const leafMat = new THREE.MeshPhysicalMaterial({
      color: 0x1b4332,
      emissive: 0x2d6a4f,
      emissiveIntensity: 0.45,
      roughness: 0.22,
      metalness: 0.2,
      clearcoat: 0.95,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < 4; i++) {
      const leafMesh = new THREE.Mesh(leafGeo, leafMat);
      const angle = (i / 4) * Math.PI * 2 + Math.PI * 0.25;
      leafMesh.rotation.z = angle;
      leafMesh.rotation.x = -0.62;
      leafMesh.position.y = -0.45;
      leafGroup.add(leafMesh);
    }

    // E. Orbiting Celestial Dew Ring with Baby Pink Hue
    const haloRingGeo = new THREE.TorusGeometry(2.5, 0.035, 16, 100);
    const haloRingMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      emissive: 0xf472b6,
      emissiveIntensity: 0.75,
      roughness: 0.15,
      metalness: 0.85,
    });
    const haloRing = new THREE.Mesh(haloRingGeo, haloRingMat);
    haloRing.rotation.x = Math.PI * 0.45;
    rootGroup.add(haloRing);

    // F. Orbiting Dewdrops
    const dewCount = 12;
    const dews: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; yBase: number }[] = [];
    const dewGeo = new THREE.OctahedronGeometry(0.12, 0);
    const dewMat = new THREE.MeshStandardMaterial({
      color: 0xfbcfe8,
      emissive: 0xf472b6,
      emissiveIntensity: 0.9,
    });

    for (let i = 0; i < dewCount; i++) {
      const dewMesh = new THREE.Mesh(dewGeo, dewMat);
      rootGroup.add(dewMesh);
      dews.push({
        mesh: dewMesh,
        angle: (i / dewCount) * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.015,
        radius: 2.1 + Math.random() * 0.8,
        yBase: (Math.random() - 0.5) * 0.8,
      });
    }

    // ── 5. Mouse Parallax ──
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── 6. ANIMATION & FLUID SCROLL PATH DOWN THE ENTIRE WEBSITE ──
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const p = scrollRef.current; // 0 (Hero) to 1 (Finale)
      const isMobile = window.innerWidth < 768;

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // ── DYNAMIC 3D DESCENT & WEAVING TRAJECTORY DOWN THE PAGE ──
      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let targetScale = 1;
      let bloomSpread = 0.5; // Petal opening ratio

      // Downward velocity inertia: when scrolling fast, object dips downward
      const velocityDip = -Math.min(scrollVelocityRef.current * 0.45, 1.5);
      const velocityRoll = scrollVelocityRef.current * 0.25;

      if (!isMobile) {
        // Continuous S-curve descent path matching the alternating chapter cards
        // p goes from 0 (Hero) to 1 (Finale)
        const chapterWave = Math.sin(p * Math.PI * 7); // Alternates left-right per chapter
        const verticalDrift = Math.cos(p * Math.PI * 3.5) * 0.75;

        if (p < 0.08) {
          // Hero rest position: floats gracefully on the right
          const t = p / 0.08;
          targetX = THREE.MathUtils.lerp(2.8, 3.2, t);
          targetY = THREE.MathUtils.lerp(0.3, -0.2, t) + velocityDip;
          targetZ = 0.6;
          targetScale = 1.15;
          bloomSpread = 0.4;
        } else if (p > 0.88) {
          // Grand Finale: rises proudly above the birthday cake in the center
          const finT = (p - 0.88) / 0.12;
          targetX = THREE.MathUtils.lerp(chapterWave * 2.8, 0, finT);
          targetY = THREE.MathUtils.lerp(verticalDrift + velocityDip, 2.1, finT);
          targetZ = THREE.MathUtils.lerp(0, 1.2, finT);
          targetScale = THREE.MathUtils.lerp(1.0, 1.35, finT);
          bloomSpread = THREE.MathUtils.lerp(0.6, 1.2, finT); // Fully blooming!
        } else {
          // Navigating down through chapters: weaves left and right, swooping downward
          targetX = chapterWave * 3.2;
          targetY = verticalDrift + velocityDip;
          targetZ = Math.sin(p * Math.PI * 6) * 0.8;
          targetScale = 1.0 + Math.sin(p * Math.PI * 4) * 0.15;
          bloomSpread = 0.5 + Math.sin(p * Math.PI * 5) * 0.25;
        }
      } else {
        // Phone / Mobile: elegantly framed at the top-center, reacting to vertical scroll
        const phoneBounce = Math.sin(p * Math.PI * 8) * 0.35;
        targetX = Math.sin(p * Math.PI * 4) * 0.65;
        targetY = 1.8 + phoneBounce + velocityDip;
        targetZ = 0.2;
        targetScale = 0.82 + Math.sin(p * Math.PI * 2) * 0.1;
        bloomSpread = 0.45 + p * 0.35;
      }

      // Smooth interpolation for position with snappy responsiveness
      rootGroup.position.x = THREE.MathUtils.lerp(rootGroup.position.x, targetX + mouseRef.current.x * 0.45, 0.08);
      rootGroup.position.y = THREE.MathUtils.lerp(rootGroup.position.y, targetY + mouseRef.current.y * 0.35, 0.08);
      rootGroup.position.z = THREE.MathUtils.lerp(rootGroup.position.z, targetZ, 0.08);

      const s = THREE.MathUtils.lerp(rootGroup.scale.x, targetScale, 0.08);
      rootGroup.scale.set(s, s, s);

      // ── ROTATIONS & LIVING BREATHING ANIMATION ──
      const scrollSpin = p * Math.PI * 6 + scrollVelocityRef.current * 0.6;
      rootGroup.rotation.y = elapsed * 0.4 + scrollSpin + mouseRef.current.x * 0.35;
      rootGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.18 + velocityRoll + mouseRef.current.y * 0.25;
      rootGroup.rotation.z = Math.cos(elapsed * 0.4) * 0.12 + Math.sin(p * Math.PI * 4) * 0.15;

      // Petals breathe and dynamically bloom open based on scroll progress
      const breathe = Math.sin(elapsed * 1.8) * 0.06;
      petalGroup.rotation.y = -elapsed * 0.25;
      const currentBloom = 0.9 + breathe + bloomSpread * 0.3;
      petalGroup.scale.set(currentBloom, currentBloom, currentBloom);

      // Leaves sway gently like in a warm monsoon breeze
      leafGroup.rotation.y = elapsed * 0.2 + Math.sin(elapsed * 0.8) * 0.1;
      const leafSway = 1.0 + Math.sin(elapsed * 1.2) * 0.04;
      leafGroup.scale.set(leafSway, leafSway, leafSway);

      // Firefly core pulses with warm glowing intensity
      fireflyMesh.rotation.y = elapsed * 1.2;
      fireflyMesh.rotation.z = elapsed * 0.9;
      const pulse = 1 + Math.sin(elapsed * 4) * 0.15;
      fireflyMesh.scale.set(pulse, pulse, pulse);

      // Rings spin with celestial gyroscopic momentum
      haloRing.rotation.z = elapsed * 0.35 + scrollSpin * 0.8;
      haloRing.rotation.x = Math.PI * 0.45 + Math.sin(elapsed * 0.6) * 0.15;

      // Orbiting dewdrops follow living harmonic orbits
      for (let i = 0; i < dews.length; i++) {
        const d = dews[i];
        d.angle += d.speed * (1 + scrollVelocityRef.current * 0.4);
        d.mesh.position.x = Math.cos(d.angle) * d.radius;
        d.mesh.position.z = Math.sin(d.angle) * d.radius;
        d.mesh.position.y = d.yBase + Math.sin(elapsed * 2.2 + i * 1.1) * 0.35;
        const dewPulse = 1 + Math.sin(elapsed * 3 + i) * 0.2;
        d.mesh.scale.set(dewPulse, dewPulse, dewPulse);
      }

      lanternLight.position.copy(rootGroup.position);
      pinkLight.position.set(
        rootGroup.position.x + 3.5,
        rootGroup.position.y + 2.5,
        rootGroup.position.z + 4.0
      );

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      dropletGeo.dispose();
      dropletMat.dispose();
      fireflyGeo.dispose();
      fireflyMat.dispose();
      petalGeo.dispose();
      petalMat.dispose();
      leafGeo.dispose();
      leafMat.dispose();
      haloRingGeo.dispose();
      haloRingMat.dispose();
      dewGeo.dispose();
      dewMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 3,
        overflow: 'hidden',
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.85)) drop-shadow(0 0 30px rgba(244,114,182,0.3))',
      }}
    />
  );
}
