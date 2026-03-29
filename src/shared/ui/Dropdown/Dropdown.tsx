import React, { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';
import type { DropdownProps } from './type';

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options = [],
  placeholder = 'Выберите...',
  multiple = false,
  checkbox = false,
  searchable = false,
  renderOption,
  renderDropdownContent,
  className = ''
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [open]);

  const filtered =
    !searchable || !search
      ? options
      : options.filter((opt) =>
          opt.label.toLowerCase().includes(search.toLowerCase())
        );

  const isSelected = (val: string) =>
    multiple ? Array.isArray(value) && value.includes(val) : value === val;

  const handleSelect = (val: string) => {
    if (multiple) {
      if (!Array.isArray(value)) return;
      if (value.includes(val)) {
        onChange(value.filter((v) => v !== val));
      } else {
        onChange([...value, val]);
      }
    } else {
      onChange(val);
      setOpen(false);
    }
  };

    const isPlaceholder = multiple
    ? !(Array.isArray(value) && value.length)
    : value === '';

  const display = multiple
    ? (Array.isArray(value) &&
        options
          .filter((o) => value.includes(o.value))
          .map((o) => o.label)
          .join(', ')) ||
      placeholder
    : options.find((o) => o.value === value)?.label || placeholder;

  const dropdownContent = renderDropdownContent ? (
    renderDropdownContent()
  ) : (
    <ul className={styles.list}>
      {filtered.length ? (
        filtered.map((opt) => (
          <li
            key={opt.value}
            className={[
              styles.option,
              isSelected(opt.value) ? styles.selected : ''
            ].join(' ')}
            onClick={() => handleSelect(opt.value)}
          >
            {checkbox && (
              <input
                type='checkbox'
                checked={isSelected(opt.value)}
                readOnly
                tabIndex={-1}
                className={styles.checkbox}
              />
            )}
            {renderOption
              ? renderOption(opt, isSelected(opt.value))
              : opt.label}
          </li>
        ))
      ) : (
        <li className={styles.noOptions}>Нет вариантов</li>
      )}
    </ul>
  );

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type='button'
         className={`${styles.control} ${styles[className]}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={display !== placeholder ? '' : styles.placeholder}>{display}</span>
        <span className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`} />
      </button>
      {open && (
        <div className={styles.dropdown}>
          {searchable && (
            <input
              className={styles.search}
              placeholder='Поиск...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          )}
          {dropdownContent}
        </div>
      )}
    </div>
  );
};
