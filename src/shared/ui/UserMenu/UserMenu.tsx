import { useDispatch } from '../../utils/store.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router';
import { logout } from '../../../slice/profileSlice.tsx';
import LogoutIcon from '../../../assets/icons/logout.svg';
import styles from './UserMenu.module.css';

interface UserMenuProps {
  onDropdownClose?: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onDropdownClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (onDropdownClose) onDropdownClose();
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDropdownClose) onDropdownClose();
    dispatch(logout());
    navigate(AppRoutes.HOME);
  };

  return (
    <div className={styles.userMenu}>
      <Link
        to={AppRoutes.PROFILE}
        className={styles.userMenuItem}
        onClick={handleProfileClick}
      >
        Личный кабинет
      </Link>
      <Link
        to={AppRoutes.HOME}
        className={styles.userMenuItem}
        onClick={handleLogout}
      >
        Выйти из аккаунта
        <span className={styles.logoutIcon}>
          <LogoutIcon />
        </span>
      </Link>
    </div>
  );
};

export default UserMenu;
