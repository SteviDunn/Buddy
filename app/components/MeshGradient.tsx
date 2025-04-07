'use client';

import { useEffect } from 'react';

const Gradient = (require('./gradient.js') as any).Gradient;

export default function MeshGradient() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas'); 
  }, []);

  return (
    <canvas
      id="gradient-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        '--gradient-color-1': '#dca8d8',
        '--gradient-color-2': '#a3d3f9',
        '--gradient-color-3': '#fcd6d6',
        '--gradient-color-4': '#ffffff',
      }as any}
    />
  );
}
