import React from 'react';
import TerminalConfigDisplay from '../TerminalConfigDisplay';
import { TerminalConfig } from '../../types';

interface TerminalTabProps {
  terminalConfig: TerminalConfig;
}

function TerminalTab({ terminalConfig }: TerminalTabProps) {
  return (
    <div className="device-terminal-tab">
      <h3 className="tab-title">Terminal Configuration</h3>
      <TerminalConfigDisplay config={terminalConfig} />

      <div className="tab-actions">
        <button className="btn btn-primary">Edit Configuration</button>
      </div>
    </div>
  );
}

export default TerminalTab;