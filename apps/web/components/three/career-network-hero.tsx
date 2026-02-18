"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CareerNetworkHero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / 360, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, 360);
    mount.appendChild(renderer.domElement);

    const pointsGeometry = new THREE.BufferGeometry();
    const vertices = Array.from({ length: 120 }, () => (Math.random() - 0.5) * 10);
    pointsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

    const points = new THREE.Points(
      pointsGeometry,
      new THREE.PointsMaterial({ color: 0x2ed3e6, size: 0.05 })
    );
    scene.add(points);

    const animate = () => {
      points.rotation.y += 0.002;
      points.rotation.x += 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mount.clientWidth / 360;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, 360);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="h-[360px] w-full rounded-2xl border border-secondary/30 bg-primary/95" />;
}
