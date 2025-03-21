import React from 'react';

interface TerminalTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TerminalTabs: React.FC<TerminalTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="terminal-tabs">
      <div
        className={`terminal-tab ${activeTab === 'config' ? 'active' : ''}`}
        onClick={() => setActiveTab('config')}
      >
        Configuration
      </div>
      <div
        className={`terminal-tab ${activeTab === 'commands' ? 'active' : ''}`}
        onClick={() => setActiveTab('commands')}
      >
        Command Library
      </div>
      <div
        className={`terminal-tab ${activeTab === 'snippets' ? 'active' : ''}`}
        onClick={() => setActiveTab('snippets')}
      >
        Snippets
      </div>
      <div
        className={`terminal-tab ${activeTab === 'shell' ? 'active' : ''}`}
        onClick={() => setActiveTab('shell')}
      >
        Shell Manager
      </div>
    </div>
  );
};

export default TerminalTabs;