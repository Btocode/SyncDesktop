import React, { useState } from 'react';
import { spacing, colors } from '../styles/theme';
import { getUserInfo, logout } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userInfo = getUserInfo();
  const firstName = userInfo?.display_name?.split(' ')[0] || 'User';
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarClass = `dashboard-sidebar ${isSidebarOpen ? 'open' : 'closed'}`;

  const handleKeyPress = (e: React.KeyboardEvent, tab: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveTab(tab);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={sidebarClass}>
      <button
        className="sidebar-toggle"
        // onClick={toggleSidebar}
        type="button"
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <span className="sidebar-toggle-icon">
          {isSidebarOpen ? '←' : '→'}
        </span>
      </button>
      <div className="sidebar-section">
        <h1 style={{ margin: `0 0 ${spacing.xl} 0`, fontSize: '1.5rem' }}>
          SyncD
        </h1>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Main</h3>
        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item ${activeTab === 'devices' ? 'active' : ''}`}
            onClick={() => setActiveTab('devices')}
            onKeyPress={(e) => handleKeyPress(e, 'devices')}
            tabIndex={0}
            role="button"
          >
            <span className="sidebar-menu-item-icon">💻</span>
            <span>Devices</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'extensions' ? 'active' : ''}`}
            onClick={() => setActiveTab('extensions')}
            onKeyPress={(e) => handleKeyPress(e, 'extensions')}
            tabIndex={0}
            role="button"
          >
            <span className="sidebar-menu-item-icon">🧩</span>
            <span>Extensions</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'terminal' ? 'active' : ''}`}
            onClick={() => setActiveTab('terminal')}
            onKeyPress={(e) => handleKeyPress(e, 'terminal')}
            tabIndex={0}
            role="button"
          >
            <span className="sidebar-menu-item-icon">📟</span>
            <span>Terminal</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'themes' ? 'active' : ''}`}
            onClick={() => setActiveTab('themes')}
            onKeyPress={(e) => handleKeyPress(e, 'themes')}
            tabIndex={0}
            role="button"
          >
            <span className="sidebar-menu-item-icon">🎨</span>
            <span>Themes</span>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">System</h3>
        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
            onKeyPress={(e) => handleKeyPress(e, 'settings')}
            tabIndex={0}
            role="button"
          >
            <span className="sidebar-menu-item-icon">⚙️</span>
            <span>Settings</span>
          </li>
          <li
            className="sidebar-menu-item"
            tabIndex={0}
            role="button"
          >
            <span className="sidebar-menu-item-icon">❓</span>
            <span>Help</span>
          </li>
        </ul>
      </div>

      <div style={{ marginTop: 'auto', padding: `${spacing.lg} 0` }}>
        <div
          style={{
            padding: spacing.md,
            backgroundColor: colors.bgTertiary,
            borderRadius: '6px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: spacing.sm,
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: colors.accentPrimary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.md,
                fontWeight: 'bold',
              }}
            >
              {firstName.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: '500' }}>{firstName}</div>
            </div>
          </div>
          <button
            className="btn btn-outline"
            style={{ width: '100%', fontSize: '0.85rem' }}
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
