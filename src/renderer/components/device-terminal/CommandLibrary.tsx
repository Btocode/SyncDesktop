import React, { useState } from 'react';

interface CommandLibraryProps {
  commandLibrary: Array<{ category: string; name: string; command: string; description: string }>;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  handleCopyCommand: (command: string) => void;
}

function CommandLibrary({ commandLibrary, searchTerm, setSearchTerm, handleCopyCommand }: CommandLibraryProps) {


  const filteredCommands = commandLibrary.filter(cmd =>
    cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="terminal-tab-content">
      <div className="command-library-header">
        <h3>Command Library</h3>
        <div className="command-search">
          <input
            type="text"
            placeholder="Search commands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="command-list">
        {filteredCommands.map((cmd, index) => (
          <div key={index} className="command-item">
            <div className="command-info">
              <div className="command-name">{cmd.name}</div>
              <div className="command-category">{cmd.category}</div>
              <div className="command-description">{cmd.description}</div>
            </div>
            <div className="command-code">
              <code>{cmd.command}</code>
              <button
                className="btn btn-small btn-outline"
                onClick={() => handleCopyCommand(cmd.command)}
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandLibrary;