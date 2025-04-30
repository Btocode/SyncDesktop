import React, { useEffect, useState } from 'react';
import ExtensionItem from '../components/ExtensionItem';
import Loader from '../components/Loader';
import { Extension } from '../types';
import { colors, commonStyles, spacing } from '../styles/theme';
// import '../styles/ExtensionsPage.css';

interface ExtensionResponse {
  error: string | null;
  extensions: {
    name: string;
    id: string;
    enabled: boolean;
    version: string;
    enable_link: string;
    disable_link: string;
  }[];
}

function ExtensionsPage() {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Extensions');


  const fetchExtensions = async () => {
    try {
      setLoading(true);
      const result = (await window.electron.ipcRenderer.invoke('get-ubuntu-extensions')) as ExtensionResponse;
      if (result.error) {
        throw new Error(result.error);
      }

      // Transform the API response to match our Extension type
      const formattedExtensions = result.extensions.map((ext: Extension) => ({
        id: ext.id,
        name: ext.name,
        version: ext.version,
        enabled: ext.enabled,
      }));

      setExtensions(formattedExtensions);
    } catch (err) {
      setError('Failed to fetch extensions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExtensions();
  }, []);

  // Filter extensions based on search term and filter selection
  const filteredExtensions = extensions.filter((ext: Extension) => {
    const matchesSearch = ext.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'All Extensions') return matchesSearch;
    if (filter === 'Enabled') return matchesSearch && ext.enabled;
    if (filter === 'Disabled') return matchesSearch && !ext.enabled;
    return matchesSearch;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleRefresh = () => {
    fetchExtensions();
  };

  const handleToggleExtension = async (extensionId: string) => {
    try {
      const extension = extensions.find(ext => ext.id === extensionId);
      if (!extension) return;

      const command = extension.enabled
        ? `gnome-extensions disable ${extensionId}`
        : `gnome-extensions enable ${extensionId}`;

      const result = await window.electron.ipcRenderer.invoke(
        'execute-command',
        command
      );

      if (result.success) {
        // Refresh the extensions list to show updated state
        fetchExtensions();
      } else {
        console.error('Failed to toggle extension:', result.error);
        setError(`Failed to toggle extension: ${result.error}`);
      }
    } catch (err) {
      console.error('Error toggling extension:', err);
      setError(err instanceof Error ? err.message : 'Failed to toggle extension');
    }
  };

  const renderContent = () => {
    if (error) {
      return <div style={{ color: colors.error, padding: spacing.lg }}>{error}</div>;
    }

    return (
      <div className="extensions-list" style={{ maxHeight: '600px', marginTop: spacing.lg }}>
        {filteredExtensions.length > 0 ? (
          filteredExtensions.map(ext => (
            <ExtensionItem
              key={ext.id}
              extension={ext}
              onToggle={handleToggleExtension}
            />
          ))
        ) : (
          <div style={{ padding: spacing.md, textAlign: 'center' }}>
            No extensions found matching your criteria.
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Extensions</h1>
          <p className="dashboard-subtitle">Manage all your extensions across devices</p>
        </div>
      </div>

      <div style={commonStyles.flexBetween}>
        <div>
          <input
            type="text"
            placeholder="Search extensions..."
            style={{
              ...commonStyles.input,
              width: '300px'
            }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="extensions-dropdown">
            <select
              value={filter}
              onChange={handleFilterChange}
            >
              <option>All Extensions</option>
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
          <button
            className="btn btn-outline"
            style={{ marginLeft: spacing.sm }}
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
      </div>

      <div>
        {loading ? (
          <Loader text="Loading extensions..." />
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
}

export default ExtensionsPage;