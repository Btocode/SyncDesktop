import React, { useState } from 'react';

interface SnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSnippet: (name: string, content: string, category: string) => void;
}

const SnippetModal: React.FC<SnippetModalProps> = ({ isOpen, onClose, onAddSnippet }) => {
  const [snippetName, setSnippetName] = useState('');
  const [snippetContent, setSnippetContent] = useState('');
  const [snippetCategory, setSnippetCategory] = useState('');

  const handleSubmit = () => {
    if (snippetName && snippetContent) {
      onAddSnippet(snippetName, snippetContent, snippetCategory);
      onClose(); // Close the modal after adding the snippet
    } else {
      alert('Please fill in all fields.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Snippet</h2>
        <div className="snippet-input-form">
          <input
            className="snippet-input" // Use existing class for styling
            type="text"
            placeholder="Snippet Name"
            value={snippetName}
            onChange={(e) => setSnippetName(e.target.value)}
          />
          <textarea
            className="snippet-textarea" // Use existing class for styling
            placeholder="Snippet Content"
            value={snippetContent}
            onChange={(e) => setSnippetContent(e.target.value)}
          />
          <input
            className="snippet-input" // Use existing class for styling
            type="text"
            placeholder="Category"
            value={snippetCategory}
            onChange={(e) => setSnippetCategory(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleSubmit}>Add Snippet</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SnippetModal;