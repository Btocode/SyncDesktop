import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/variables.css';
import './styles/global.css';
import './styles/device-details.css';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
