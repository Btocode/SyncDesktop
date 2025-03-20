import React from 'react';
import { ThemeConfig } from '../../types';

interface ThemeTabProps {
  themeConfig: ThemeConfig;
}

function ThemeTab({ themeConfig }: ThemeTabProps) {
  return (
    <div className="device-theme-tab">
      <h3 className="tab-title">Theme Configuration</h3>

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

      <div className="theme-preview">
        <h4>Preview</h4>
        <div className="code-preview">
          <div className="code-line"><span className="code-keyword">function</span> <span className="code-function">calculateTotal</span>(<span className="code-param">items</span>) {`{`}</div>
          <div className="code-line indented-1"><span className="code-keyword">const</span> total = items.<span className="code-function">reduce</span>((sum, item) {`=>`} {`{`}</div>
          <div className="code-line indented-2"><span className="code-keyword">return</span> sum + item.price * item.quantity;</div>
          <div className="code-line indented-1">{`}`}, <span className="code-number">0</span>);</div>
          <div className="code-line indented-1"><span className="code-keyword">return</span> total;</div>
          <div className="code-line">{`}`}</div>
        </div>
      </div>

      <div className="tab-actions">
        <button className="btn btn-primary">Customize Theme</button>
      </div>
    </div>
  );
}

export default ThemeTab;