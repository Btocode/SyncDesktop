import React, { useEffect, useState } from 'react';
import { ThemeConfig } from '../types';
// import '../styles/ThemesPage.css';
import Loader from '../components/Loader';

interface ThemeResult {
  error: string | null;
  themeInfo: any;
}

function ThemesPage() {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemeInfo = async () => {
      try {
        setLoading(true);
        const result = (await window.electron.ipcRenderer.invoke(
          'get-linux-theme-info'
        )) as ThemeResult;

        if (result.error) {
          setError(result.error);
          console.error(result.error);
        } else {
          console.log('Linux theme info:', result.themeInfo);
          // Update state with the theme info
          setThemeConfig(result.themeInfo);
        }
      } catch (error) {
        console.error('Error fetching theme info:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch theme information');
      } finally {
        setLoading(false);
      }
    };

    fetchThemeInfo();
  }, []);

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Theme Configuration</h1>
          <p className="dashboard-subtitle">An overview of your current theme configuration</p>
        </div>
      </div>

      {loading ? (
        <Loader text="Loading theme information..." />
      ) : error ? (
        <div style={{ color: 'var(--accent-danger)', padding: '1rem', textAlign: 'center' }}>
          {error}
        </div>
      ) : (
        <>
          <div className="theme-stats-grid">
            <div className="stat-item">
              <div className="stat-label">UI Theme</div>
              <div className="stat-value">{themeConfig?.uiTheme}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Icon Theme</div>
              <div className="stat-value">{themeConfig?.iconTheme}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Syntax Theme</div>
              <div className="stat-value">{themeConfig?.syntaxTheme}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Font</div>
              <div className="stat-value">{themeConfig?.font}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Dark Mode</div>
              <div className="stat-value">{themeConfig?.darkMode ? 'Enabled' : 'Disabled'}</div>
            </div>
          </div>

          {themeConfig && (
            <div className="theme-details-section">
              <h3>Advanced Theme Details</h3>
              <div className="theme-stats-grid">
                <div className="stat-item">
                  <div className="stat-label">Monospace Font</div>
                  <div className="stat-value">{themeConfig.monospaceFont || 'Not available'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Document Font</div>
                  <div className="stat-value">{themeConfig.documentFont || 'Not available'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Font Antialiasing</div>
                  <div className="stat-value">{themeConfig.fontAntialiasing || 'Not available'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Font Hinting</div>
                  <div className="stat-value">{themeConfig.fontHinting || 'Not available'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Cursor Theme</div>
                  <div className="stat-value">{themeConfig.cursorTheme || 'Not available'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Cursor Size</div>
                  <div className="stat-value">{themeConfig.cursorSize || 'Not available'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Accent Color</div>
                  <div className="stat-value">{themeConfig.accentColor || 'Not available'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Button Layout</div>
                  <div className="stat-value">{themeConfig.buttonLayout || 'Not available'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Animations</div>
                  <div className="stat-value">{themeConfig.animations ? 'Enabled' : 'Disabled'}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Clock Format</div>
                  <div className="stat-value">{themeConfig.clockFormat || 'Not available'}</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ThemesPage;