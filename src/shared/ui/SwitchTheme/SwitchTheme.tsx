import type { SwitchThemeProps } from './SwitchTheme.interface.ts';
import MoonIcon from '../../../assets/icons/moon.svg'
import styles from './SwitchTheme.module.css';

const SwitchTheme = ({ className, onClick }: SwitchThemeProps) => {
  return (
    <div className={`${styles.switchTheme} ${className}`} onClick={onClick}>
      <MoonIcon />
    </div>
  );
};

export default SwitchTheme;
