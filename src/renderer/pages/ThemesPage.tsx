import React from 'react';
import { ThemeConfig } from '../types';
import '../styles/ThemesPage.css';

interface ThemesPageProps {
  themeConfig: ThemeConfig;
}

function ThemesPage({ themeConfig }: ThemesPageProps) {
  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Theme Configuration</h1>
          <p className="dashboard-subtitle">Customize your visual experience</p>
        </div>
      </div>

      <div className="theme-stats-grid">
        <div className="stat-item">
          <div className="stat-label">UI Theme</div>
          <div className="stat-value">{themeConfig.uiTheme}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Icon Theme</div>
          <div className="stat-value">{themeConfig.iconTheme}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Syntax Highlighting</div>
          <div className="stat-value">{themeConfig.syntaxTheme}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Font</div>
          <div className="stat-value">{themeConfig.font}</div>
        </div>
      </div>

      <div className="theme-preview-section">
        <h3>Theme Preview</h3>
        <div className="code-preview-container">
          <div className="code-line function-declaration">function <span className="function-name">calculateTotal</span>(<span className="parameter-name">items</span>) {'{'}</div>
          <div className="code-line indented-1">
            <span className="keyword">const</span> total = items.<span className="method-name">reduce</span>((sum, item) {'=>'} {'{'}
          </div>
          <div className="code-line indented-2">
            <span className="keyword">return</span> sum + item.price * item.quantity;
          </div>
          <div className="code-line indented-1">{'}'}, <span className="number">0</span>);</div>
          <div className="code-line indented-1">
            <span className="keyword">return</span> total;
          </div>
          <div className="code-line">{'}'}</div>
        </div>
      </div>

      <div className="theme-customize-section">
        <button className="btn btn-primary">Customize Theme</button>
      </div>
    </div>
  );
}

export default ThemesPage;