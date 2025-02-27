import React from 'react';

interface TextEditorProps {
  inviteData: {
    names: string;
    date: string;
    venue: string;
    message: string;
  };
  onTextChange: (field: string, value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ inviteData, onTextChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="names" className="block text-sm font-medium text-gray-700 mb-1">
          Couple Names
        </label>
        <input
          type="text"
          id="names"
          value={inviteData.names}
          onChange={(e) => onTextChange('names', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Invitation Message
        </label>
        <textarea
          id="message"
          value={inviteData.message}
          onChange={(e) => onTextChange('message', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
        />
      </div>
      
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Wedding Date
        </label>
        <input
          type="text"
          id="date"
          value={inviteData.date}
          onChange={(e) => onTextChange('date', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
        />
      </div>
      
      <div>
        <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">
          Venue
        </label>
        <input
          type="text"
          id="venue"
          value={inviteData.venue}
          onChange={(e) => onTextChange('venue', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
        />
      </div>
    </div>
  );
};

export default TextEditor;