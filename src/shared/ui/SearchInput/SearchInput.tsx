import {
  useState,
  type FC,
  type ChangeEvent,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import type { SearchInputProps } from './SearchInput.interface.ts';
import styles from './SearchInput.module.css';
import SearchIcon from '../../../assets/icons/search.svg';
import CloseIcon from '../../../assets/icons/cross.svg'
import clsx from 'clsx';
import { SEARCH_INPUT_TEXTS } from './SearchInputTexts.ts';
import { useDispatch, useSelector } from '../../utils/store.tsx';
import {
  filtersSelectors,
  setSearchQuery
} from '../../../slice/filtersSlice.ts';

interface SearchInputPropsExtended extends SearchInputProps {
  useReduxSearch?: boolean;
  submitOnChange?: boolean;
}

const SearchInput: FC<SearchInputPropsExtended> = ({
  type,
  id,
  ariaLabel,
  value,
  onChange,
  className = '',
  placeholder = SEARCH_INPUT_TEXTS.PLACEHOLDER,
  onBlur,
  onFocus,
  onClear,
  onSubmit,
  useReduxSearch = false,
  submitOnChange = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState('');
  const dispatch = useDispatch();
  const reduxSearchQuery = useSelector(filtersSelectors.searchQuery);

  // Синхронизация локального значения с Redux при монтировании
  useEffect(() => {
    if (useReduxSearch) {
      setLocalValue(reduxSearchQuery || '');
    } else {
      setLocalValue(value || '');
    }
  }, [useReduxSearch, reduxSearchQuery, value]);

  // Определяем, какое значение отображать в инпуте
  const displayValue = useMemo(() => localValue || '', [localValue]);

  // Вычисляем классы для input с помощью useMemo
  const inputClasses = useMemo(
    () =>
      clsx(
        styles.searchInput,
        {
          [styles.searchInputFocused]: isFocused,
          [styles.searchInputWithClear]: displayValue
        },
        className
      ),
    [isFocused, displayValue, className]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);

      // Если включен режим отправки при изменении, обновляем значение в Redux
      if (submitOnChange && useReduxSearch) {
        dispatch(setSearchQuery(newValue));
      } else if (!useReduxSearch) {
        onChange(newValue);
      }
    },
    [submitOnChange, useReduxSearch, dispatch, onChange]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  const handleClear = useCallback(() => {
    setLocalValue('');

    if (useReduxSearch) {
      dispatch(setSearchQuery(''));
    } else {
      onChange('');
    }

    onClear?.();
  }, [useReduxSearch, dispatch, onChange, onClear]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSubmit) {
        // При нажатии Enter отправляем значение в Redux и вызываем onSubmit
        if (useReduxSearch) {
          dispatch(setSearchQuery(localValue));
        }
        onSubmit(localValue);
      }
    },
    [onSubmit, useReduxSearch, dispatch, localValue]
  );

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <div className={styles.searchIcon}>
          <SearchIcon aria-hidden='true' />
        </div>

        <input
          type={type || 'text'}
          id={id}
          value={displayValue}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={inputClasses}
          aria-label={ariaLabel}
        />
        {displayValue && (
          <button
            type='button'
            className={styles.clearIcon}
            onClick={handleClear}
            aria-label={SEARCH_INPUT_TEXTS.CLEAR_ARIA_LABEL}
          >
            <CloseIcon aria-hidden='true' />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
