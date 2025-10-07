import React from 'react';
import { Select } from '../ui/Select';
import { SORT_OPTIONS } from '../../utils/constants';
import { SortOption } from '../../types';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <Select
      label="Sort By"
      options={SORT_OPTIONS.map(opt => ({ value: opt.value, label: opt.label }))}
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
    />
  );
};