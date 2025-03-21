import React from 'react';
import TerminalConfigDisplay from '../TerminalConfigDisplay'; // Assuming you have this component

interface TerminalConfigProps {
  currentConfig: any; // Replace with the actual type
  setCurrentConfig: (config: any) => void; // Replace with the actual type
  editMode: boolean;
  setEditMode: (edit: boolean) => void;
}

const TerminalConfig: React.FC<TerminalConfigProps> = ({ currentConfig, setCurrentConfig, editMode, setEditMode }) => {
  return (
    <div className="terminal-tab-content">
      {editMode ? (
        <div className="edit-config-form">
          {/* Add your form fields here for editing the terminal configuration */}
          <button onClick={() => setEditMode(false)}>Save Configuration</button>
        </div>
      ) : (
        <>
          <TerminalConfigDisplay config={currentConfig} />
          <button onClick={() => setEditMode(true)}>Edit Configuration</button>
        </>
      )}
    </div>
  );
};

export default TerminalConfig;