"use client";
import DotGrid from './ui/dotBg';

export function DotBg(props) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <DotGrid
        dotSize={5}
        gap={15}
        baseColor="white"
        activeColor="white"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
        {...props}
      />
    </div>
  );
}