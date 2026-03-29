import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../router';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate(AppRoutes.HOME);
  const navigateToRegistration = () => navigate(AppRoutes.REGISTRATION);
  const navigateToLogin = () => navigate(AppRoutes.LOGIN);
  const navigateToSkill = (id: string) => navigate(AppRoutes.SKILL.replace(':id', id));
  const navigateToFavorites = () => navigate(AppRoutes.FAVORITES);
  const navigateToProfile = () => navigate(AppRoutes.PROFILE);

  return {
    navigateToHome,
    navigateToRegistration,
    navigateToLogin,
    navigateToSkill,
    navigateToFavorites,
    navigateToProfile,
  };
};