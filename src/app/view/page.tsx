// src/components/CADViewer.tsx
'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Viewer from 'react-viewer';

const CADViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  const handleImageClick = () => {
    // Generate a URL from the canvas for the viewer
    const container = containerRef.current;
    if (container) {
      const canvas = container.querySelector('canvas');
      if (canvas) {
        setImageUrl(canvas.toDataURL());
        setVisible(true);
      }
    }
  };

  return (
    <div>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '500px' }}
        onClick={handleImageClick}
      ></div>
      <Viewer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        images={[{ src: imageUrl, alt: '' }]}
      />
    </div>
  );
};

export default CADViewer;
