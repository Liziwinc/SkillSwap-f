export interface Option {
  value: string;
  label: string;
}

export interface DropdownProps {
  value: string | string[];
  onChange: (v: string | string[]) => void;
  options: Option[];
  placeholder?: string;
  multiple?: boolean;
  checkbox?: boolean;
  searchable?: boolean;
  renderOption?: (option: Option, checked: boolean) => React.ReactNode;
  renderDropdownContent?: () => React.ReactNode;
  className?: string;
}
