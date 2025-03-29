import React, { useState } from 'react';

interface SnippetFormProps {
  onAddSnippet: (name: string, content: string, category: string) => void;
  onClose: () => void;
}

const SnippetForm: React.FC<SnippetFormProps> = ({ onAddSnippet, onClose }) => {
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

  return (
    <div className="snippet-input-form">
      <input
        className="snippet-input"
        type="text"
        placeholder="Snippet Name"
        value={snippetName}
        onChange={(e) => setSnippetName(e.target.value)}
      />
      <textarea
        className="snippet-textarea"
        placeholder="Snippet Content"
        value={snippetContent}
        onChange={(e) => setSnippetContent(e.target.value)}
      />
      <input
        className="snippet-input"
        type="text"
        placeholder="Categor"
        value={snippetCategory}
        onChange={(e) => setSnippetCategory(e.target.value)}
      />
      <div className="modal-actions">
        <button className="btn btn-primary" onClick={handleSubmit}>Add Snippet</button>
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default SnippetForm;