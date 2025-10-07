import React from 'react';
import { Grid, List } from 'lucide-react';
import { ViewMode } from '../../types';

interface ViewToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onChange }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onChange('grid')}
        className={`p-2 rounded-lg border transition-colors ${
          viewMode === 'grid'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
        }`}
        title="Grid View"
      >
        <Grid className="h-4 w-4" />
      </button>
      <button
        onClick={() => onChange('list')}
        className={`p-2 rounded-lg border transition-colors ${
          viewMode === 'list'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
        }`}
        title="List View"
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
};
