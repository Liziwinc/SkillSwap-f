export interface SearchInputProps {
  type: string;
  id?: string;
  value: string;
  ariaLabel?: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
}
