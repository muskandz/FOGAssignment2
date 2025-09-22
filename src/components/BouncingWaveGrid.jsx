/**
 * BouncingWaveGrid Component
 * 
 * Renders an interactive grid with animated wave patterns. Supports multiple
 * wave types, color themes, and real-time parameter adjustments.
 * 
 * @param {number} rows - Number of grid rows (default: 15)
 * @param {number} cols - Number of grid columns (default: 20)
 * @param {number} speed - Animation speed multiplier (default: 1)
 * @param {string} waveType - Type of wave pattern ('sine', 'pulse', 'ripple', 'cascade')
 * @param {object} colorTheme - Color theme object with name and baseHue
 * @param {number} intensity - Wave intensity percentage (10-100)
 */

import React, { useState, useEffect, useRef } from 'react';
import './BouncingWaveGrid.css';

const BouncingWaveGrid = ({ 
  rows = 15, 
  cols = 20, 
  speed = 1, 
  waveType = 'sine',
  colorTheme = { name: 'Rainbow', baseHue: 0 },
  intensity = 50
}) => {
  // State for dynamic color hue
  const [hue, setHue] = useState(colorTheme.baseHue);
  
  // Animation references for smooth performance
  const wavePosition = useRef(0);
  const direction = useRef(1);
  const animationFrameId = useRef();
  const lastTime = useRef(0);
  const pulsePhase = useRef(0);

  /**
   * Main animation loop using requestAnimationFrame for optimal performance
   * Handles wave position, direction changes, and color cycling
   */
  const animate = (timestamp) => {
    const deltaTime = timestamp - lastTime.current;
    lastTime.current = timestamp;

    // Update wave position based on speed and direction
    const movement = (direction.current * 0.01 * speed * deltaTime);
    wavePosition.current += movement;

    // Bounce wave at grid boundaries
    if (wavePosition.current >= cols || wavePosition.current <= 0) {
      direction.current *= -1;
      wavePosition.current = Math.max(0, Math.min(cols, wavePosition.current));
    }

    // Update hue based on color theme
    if (colorTheme.name === 'Rainbow') {
      setHue(prevHue => (prevHue + (0.05 * speed * deltaTime)) % 360);
    } else {
      setHue(colorTheme.baseHue);
    }

    // Update pulse phase for pulse wave type
    pulsePhase.current += 0.02 * speed * deltaTime;

    animationFrameId.current = requestAnimationFrame(animate);
  };

  // Setup and cleanup animation
  useEffect(() => {
    lastTime.current = performance.now();
    animationFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [rows, cols, speed, colorTheme]);

  /**
   * Calculate cell styling based on wave type and position
   * @param {number} rowIndex - Cell row index
   * @param {number} colIndex - Cell column index
   * @returns {object} CSS style object for the cell
   */

  const getCellStyle = (rowIndex, colIndex) => {
    const waveWidth = 5;
    
    let lightness = 0;
    let saturation = 100;
    let currentHue = hue;

    switch (waveType) {
      case 'sine': {
        // Classic horizontal bouncing wave
        const offset = colIndex - wavePosition.current;
        if (offset * direction.current <= 0) {
          const distance = Math.abs(offset);
          if (distance < waveWidth) {
            // Original wave intensity (50% base intensity)
            lightness = 50 * (1 - distance / waveWidth);
          }
        }
        break;
      }
      
      case 'pulse': {
        // Circular pulsing effect from wave position
        const distance = Math.sqrt(
          Math.pow(colIndex - wavePosition.current, 2) + 
          Math.pow(rowIndex - Math.floor(rows / 2), 2)
        );
        const pulseRadius = 3 + 2 * Math.sin(pulsePhase.current);
        if (distance < pulseRadius) {
          lightness = (intensity / 100) * 60 * (1 - distance / pulseRadius);
        }
        break;
      }
      
      case 'ripple': {
        // Concentric ripples emanating from center
        const distance = Math.sqrt(
          Math.pow(colIndex - wavePosition.current, 2) + 
          Math.pow(rowIndex - Math.floor(rows / 2), 2)
        );
        const ripple = Math.sin(distance * 0.5 - pulsePhase.current) * 0.5 + 0.5;
        if (distance < 8) {
          lightness = (intensity / 100) * 40 * ripple * (1 - distance / 8);
        }
        break;
      }
      
      case 'cascade': {
        // Waterfall effect with color variations by row
        const offset = colIndex - wavePosition.current;
        const rowOffset = Math.abs(rowIndex - Math.floor(rows / 2));
        if (offset * direction.current <= 0) {
          const distance = Math.abs(offset);
          if (distance < waveWidth) {
            const cascade = Math.max(0, 1 - rowOffset * 0.1);
            lightness = (intensity / 100) * 50 * cascade * (1 - distance / waveWidth);
            currentHue = (hue + rowOffset * 20) % 360;
          }
        }
        break;
      }
      
      default:
        break;
    }

    // Return style object if cell should be lit
    if (lightness > 0) {
      return { 
        backgroundColor: `hsl(${currentHue}, ${saturation}%, ${lightness}%)`,
        boxShadow: waveType === 'sine' ? undefined : `0 0 ${lightness * 0.3}px hsl(${currentHue}, ${saturation}%, ${lightness}%)`
      };
    }
    
    return {};
  };

  // Generate grid cells with calculated styles
  const cells = Array.from({ length: rows * cols }, (_, index) => {
    const rowIndex = Math.floor(index / cols);
    const colIndex = index % cols;
    
    return (
      <div 
        key={index} 
        className="cell" 
        style={getCellStyle(rowIndex, colIndex)}
      />
    );
  });

  return (
    <div
      className="grid-container"
      style={{
        '--grid-rows': rows,
        '--grid-cols': cols,
        '--glow-color': waveType === 'sine' 
          ? `hsla(${hue}, 100%, 50%, 0.4)` 
          : `hsla(${hue}, 100%, 50%, ${0.3 * (intensity / 100)})`
      }}
    >
      {cells}
    </div>
  );
};

export default BouncingWaveGrid;