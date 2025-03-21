import React from 'react';
import '../styles/Loader.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', text }) => {
  return (
    <div className="loader-container">
      <div className={`loader loader-${size}`}>
        <div className="loader-spinner"></div>
      </div>
      {text && <div className="loader-text">{text}</div>}
    </div>
  );
};

export default Loader;