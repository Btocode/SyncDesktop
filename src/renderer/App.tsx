import React from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DevicesPage from './pages/DevicesPage';
import './App.css';
import './styles/auth.css';
// import './styles/global.css';
import Dashboard from './components/Dashboard';

interface PrivateRouteProps {
  children: React.ReactElement;
}

function PrivateRoute({ children }: PrivateRouteProps): React.ReactElement {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/login" />;
}

// Mock data for development
const mockDevices = [
  {
    id: '1',
    name: 'Development Machine',
    type: 'Linux',
    lastSynced: new Date().toISOString(),
    status: 'synced' as const,
    syncEnabled: true,
    extensionsCount: {
      enabled: 5,
      disabled: 2,
      total: 7,
    },
    terminalConfigured: true,
    themeConfigured: true,
  },
];

export default function App(): React.ReactElement {
  const handleDeviceSelect = (deviceId: string) => {
    console.log('Selected device:', deviceId);
  };

  const handleToggleDeviceSync = (deviceId: string) => {
    console.log('Toggled sync for device:', deviceId);
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/devices"
            element={
              <PrivateRoute>
                <DevicesPage
                  devices={mockDevices}
                  onDeviceSelect={handleDeviceSelect}
                  onToggleDeviceSync={handleToggleDeviceSync}
                />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}
