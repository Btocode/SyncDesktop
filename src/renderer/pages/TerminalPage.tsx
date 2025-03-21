import React, { useState, useEffect } from 'react';
import TerminalTabs from '../components/device-terminal/TerminalTabs';
import CommandLibrary from '../components/device-terminal/CommandLibrary';
import SnippetManager from '../components/device-terminal/SnippetManager';
import TerminalConfig from '../components/device-terminal/TerminalConfig';
import { TerminalConfig as TerminalConfigType } from '../types';
import '../styles/TerminalPage.css';

interface TerminalInfoResult {
  error: string | null;
  terminalInfo: string | null;
}

const terminalConfig: TerminalConfigType = {
  shell: '/bin/zsh',
  font: 'Fira Code',
  fontSize: 14,
  lineHeight: 1.5,
  theme: 'One Dark Pro',
  cursorStyle: 'block',
  scrollback: 10000,
  customCommands: [
    'alias gs="git status"',
    'alias gc="git commit"',
    'alias gl="git log --oneline"',
    'export PATH="$HOME/.local/bin:$PATH"'
  ]
};

const TerminalPage: React.FC = () => {
  const [terminalInfo, setTerminalInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('config');
  const [currentConfig, setCurrentConfig] = useState<TerminalConfigType>(terminalConfig);
  const [selectedShell, setSelectedShell] = useState(terminalConfig.shell);
  const [availableShells, setAvailableShells] = useState<string[]>(['/bin/bash', '/bin/zsh', '/bin/fish']);
  const [searchTerm, setSearchTerm] = useState('');

  // State for adding snippets
  const [newSnippetName, setNewSnippetName] = useState('');
  const [newSnippetContent, setNewSnippetContent] = useState('');
  const [newSnippetCategory, setNewSnippetCategory] = useState('');

  // Sample command library
  const [commandLibrary, setCommandLibrary] = useState([
    { category: 'Git', name: 'Status', command: 'git status', description: 'Show the working tree status' },
    { category: 'Git', name: 'Commit', command: 'git commit -m "message"', description: 'Record changes to the repository' },
    { category: 'Git', name: 'Push', command: 'git push origin main', description: 'Update remote refs along with associated objects' },
    { category: 'File System', name: 'List Files', command: 'ls -la', description: 'List directory contents with details' },
    { category: 'File System', name: 'Change Directory', command: 'cd directory_name', description: 'Change the current directory' },
    { category: 'Network', name: 'Check Connectivity', command: 'ping google.com', description: 'Send ICMP ECHO_REQUEST to network hosts' },
    { category: 'Network', name: 'Show IP', command: 'ip addr show', description: 'Display IP addresses and network interfaces' },
    { category: 'System', name: 'Process Status', command: 'ps aux', description: 'Report a snapshot of current processes' },
    { category: 'System', name: 'Memory Usage', command: 'free -h', description: 'Display amount of free and used memory in the system' },
  ]);

  // Sample snippets
  const [snippets, setSnippets] = useState([
    { id: 1, name: 'Git Clone', content: 'git clone https://github.com/username/repo.git', category: 'Git' },
    { id: 2, name: 'Docker Run', content: 'docker run -d -p 80:80 nginx', category: 'Docker' },
    { id: 3, name: 'Find Files', content: 'find . -name "*.js" -type f', category: 'File System' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTerminalInfo = async () => {
      try {
        setLoading(true);
        const result = (await window.electron.ipcRenderer.invoke(
          'get-terminal-info'
        )) as TerminalInfoResult;

        console.log(result);
        if (result.error) {
          setError(result.error);
          console.error(result.error);
        } else {
          setTerminalInfo(result.terminalInfo);
        }
      } catch (err) {
        setError('Failed to fetch terminal information');
      } finally {
        setLoading(false);
      }
    };

    fetchTerminalInfo();
  }, []);

  const handleSaveConfig = () => {
    // Here you would save the configuration to the system
    setEditMode(false);
    // Mock saving
    setTimeout(() => {
      alert('Configuration saved successfully!');
    }, 500);
  };

  const handleAddCommand = () => {
    const newCommand = prompt('Enter a new command:');
    if (newCommand) {
      setCurrentConfig({
        ...currentConfig,
        customCommands: [...currentConfig.customCommands, newCommand]
      });
    }
  };

  const handleRemoveCommand = (index: number) => {
    const updatedCommands = [...currentConfig.customCommands];
    updatedCommands.splice(index, 1);
    setCurrentConfig({
      ...currentConfig,
      customCommands: updatedCommands
    });
  };

  const handleAddSnippet = (name: string, content: string, category: string) => {
    setSnippets([
      ...snippets,
      { id: snippets.length + 1, name, content, category: category || 'Uncategorized' }
    ]);
  };

  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    // Show a temporary notification
    const notification = document.createElement('div');
    notification.textContent = 'Copied to clipboard!';
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--accent-success)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  };

  const filteredCommands = commandLibrary.filter(cmd =>
    cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Terminal Configuration</h1>
          <p className="dashboard-subtitle">Manage your terminal settings across devices</p>
        </div>
      </div>

      <TerminalTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'config' && (
        <TerminalConfig
          currentConfig={currentConfig}
          setCurrentConfig={setCurrentConfig}
          editMode={false}
          setEditMode={() => {}}
        />
      )}

      {activeTab === 'commands' && (
        <CommandLibrary
          commandLibrary={commandLibrary}
          searchTerm={searchTerm}
          handleCopyCommand={handleCopyCommand}
        />
      )}

      {activeTab === 'snippets' && (
        <SnippetManager
          snippets={snippets}
          setSnippets={setSnippets}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default TerminalPage;