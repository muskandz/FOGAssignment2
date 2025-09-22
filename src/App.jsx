/**
 * FOG Scanner - Interactive Wave Pattern Visualizer
 * 
 * Main application component that provides an interactive interface for
 * visualizing various wave patterns with customizable parameters.
 * 
 * Features:
 * - Multiple wave patterns (Sine, Pulse, Ripple, Cascade)
 * - Color theme selection
 * - Adjustable grid dimensions
 * - Real-time speed and intensity controls
 */

import React, { useState } from 'react';
import BouncingWaveGrid from './components/BouncingWaveGrid';
import './App.css';

function App() {
  // State management for all interactive controls
  const [speed, setSpeed] = useState(1);
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(20);
  const [waveType, setWaveType] = useState('sine');
  const [colorTheme, setColorTheme] = useState('rainbow');
  const [intensity, setIntensity] = useState(100); // Set to 100% to match original intensity

  // Available color themes with their base hue values
  const colorThemes = {
    rainbow: { name: 'Rainbow', baseHue: 0 },
    ocean: { name: 'Ocean', baseHue: 200 },
    fire: { name: 'Fire', baseHue: 30 },
    forest: { name: 'Forest', baseHue: 120 },
    neon: { name: 'Neon', baseHue: 300 }
  };

  // Available wave pattern types
  const waveTypes = {
    sine: 'Sine Wave',
    pulse: 'Pulse',
    ripple: 'Ripple',
    cascade: 'Cascade'
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="title-section">
          <h1 className="title">F<span>OG</span> Scanner</h1>
          <p className="subtitle">Advanced Wave Pattern Analyzer</p>
        </div>
        <div className="status-indicator">
          <div className="pulse-dot"></div>
          <span>SCANNING ACTIVE</span>
        </div>
      </header>
      
      <div className="main-content">
        <div className="scanner-section">
          <BouncingWaveGrid 
            rows={rows} 
            cols={cols} 
            speed={speed} 
            waveType={waveType}
            colorTheme={colorThemes[colorTheme]}
            intensity={intensity}
          />
          
          <div className="scanner-info">
            <div className="info-item">
              <span className="label">Grid Size:</span>
              <span className="value">{cols} × {rows}</span>
            </div>
            <div className="info-item">
              <span className="label">Wave Speed:</span>
              <span className="value">{speed.toFixed(1)}x</span>
            </div>
            <div className="info-item">
              <span className="label">Pattern:</span>
              <span className="value">{waveTypes[waveType]}</span>
            </div>
          </div>
        </div>

        <div className="controls-panel">
          <h3 className="controls-title">Scanner Controls</h3>
          
          <div className="control-section">
            <h4>Animation Settings</h4>
            <div className="control-group">
              <label htmlFor="speed-slider">Wave Speed</label>
              <input
                id="speed-slider"
                className="slider"
                type="range"
                min="0.2"
                max="5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
              />
              <span className="value-display">{speed.toFixed(1)}x</span>
            </div>

            <div className="control-group">
              <label htmlFor="intensity-slider">Intensity</label>
              <input
                id="intensity-slider"
                className="slider"
                type="range"
                min="10"
                max="100"
                step="5"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
              />
              <span className="value-display">{intensity}%</span>
            </div>
          </div>

          <div className="control-section">
            <h4>Grid Configuration</h4>
            <div className="control-row">
              <div className="control-group">
                <label htmlFor="cols-slider">Columns</label>
                <input
                  id="cols-slider"
                  className="slider"
                  type="range"
                  min="10"
                  max="30"
                  value={cols}
                  onChange={(e) => setCols(parseInt(e.target.value))}
                />
                <span className="value-display">{cols}</span>
              </div>
              <div className="control-group">
                <label htmlFor="rows-slider">Rows</label>
                <input
                  id="rows-slider"
                  className="slider"
                  type="range"
                  min="8"
                  max="25"
                  value={rows}
                  onChange={(e) => setRows(parseInt(e.target.value))}
                />
                <span className="value-display">{rows}</span>
              </div>
            </div>
          </div>

          <div className="control-section">
            <h4>Wave Pattern</h4>
            <div className="button-group">
              {Object.entries(waveTypes).map(([key, name]) => (
                <button
                  key={key}
                  className={`wave-button ${waveType === key ? 'active' : ''}`}
                  onClick={() => setWaveType(key)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="control-section">
            <h4>Color Theme</h4>
            <div className="theme-grid">
              {Object.entries(colorThemes).map(([key, theme]) => (
                <button
                  key={key}
                  className={`theme-button ${colorTheme === key ? 'active' : ''}`}
                  onClick={() => setColorTheme(key)}
                  style={{ '--theme-hue': theme.baseHue }}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;