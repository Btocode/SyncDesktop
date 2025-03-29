import React from 'react';
import SnippetModal from './SnippetModal'; // Import the SnippetModal

interface SnippetManagerProps {
  snippets: Array<{ id: number; name: string; content: string; category: string }>;
  setSnippets: (snippets: Array<{ id: number; name: string; content: string; category: string }>) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const SnippetManager: React.FC<SnippetManagerProps> = ({ snippets, setSnippets, isModalOpen, setIsModalOpen }) => {
  const handleAddSnippet = (name: string, content: string, category: string) => {
    setSnippets([
      ...snippets,
      { id: snippets.length + 1, name, content, category: category || 'Uncategorized' }
    ]);
  };

  return (
    <div className="terminal-tab-content">
      <div className="snippets-header">
        <h3>Snippet Manager</h3>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add Snippet
        </button>
      </div>

      <div className="snippets-list">
        {snippets.map(snippet => (
          <div key={snippet.id} className="snippet-item">
            <div className="snippet-header">
              <div className="snippet-name">{snippet.name}</div>
              <div className="snippet-category">{snippet.category}</div>
            </div>
            <div className="snippet-content">
              <pre>{snippet.content}</pre>
            </div>
            <div className="snippet-actions">
              <button className="btn btn-small btn-outline">Copy</button>
              <button className="btn btn-small btn-outline">Edit</button>
              <button className="btn btn-small btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <SnippetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSnippet={handleAddSnippet}
      />
    </div>
  );
};

export default SnippetManager;