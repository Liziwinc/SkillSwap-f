import { useEffect } from 'react';
// import './app.css';
import { AppRoutes, PrivateRoute } from '../shared/router';
import { Route, Routes } from 'react-router-dom';
import Header from '../shared/ui/Header/Header.tsx';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../shared/utils/store.tsx';
import { Footer } from '../shared/ui/Footer';
import Error500Page from '../pages/Error500Page/index.tsx';
import Error404Page from '../pages/Error404Page/index.ts';
import { HomePage } from '../pages/home-page';
import { Registration } from '../pages/Registration/RegistrationPage.tsx';
import { initFromStorage } from '../slice/profileSlice';
import { SortedUsersCardsPage } from '../features/UserCards/SortedUsersCardsPage.tsx';
import { Login } from '../widgets/Login_widget/Login.tsx';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage.tsx';
import SkillPage from '../pages/SkillPage/SkillPage.tsx';
import { AboutPage } from '../shared/ui/AboutPage/AboutPage.tsx';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector((state: RootState) => state.profile);
  const isAuthenticated = Boolean(auth);

  // Восстанавливаем состояние пользователя из sessionStorage при загрузке приложения
  useEffect(() => {
    const restoreUserFromSessionStorage = () => {
      try {
        const savedToken = sessionStorage.getItem('authToken');
        const savedProfile = sessionStorage.getItem('userProfile');
        if (savedToken && savedProfile) {
          const profile = JSON.parse(savedProfile);
          // Проверяем, что данные валидны
          if (profile.auth === savedToken) {
            dispatch(
              initFromStorage({
                auth: savedToken,
                profile: profile
              })
            );
          } else {
            throw new Error('Несоответствие данных аутентификации');
          }
        } else {
          dispatch(initFromStorage({ auth: null, profile: null }));
        }
      } catch (error) {
        console.error(
          'Ошибка при восстановлении данных из sessionStorage:',
          error
        );
        // Очищаем поврежденные данные
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userProfile');
        dispatch(initFromStorage({ auth: null, profile: null }));
      }
    };

    restoreUserFromSessionStorage();
  }, [dispatch]);

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path={AppRoutes.HOME} element={<HomePage />} />
        <Route
          path={AppRoutes.POPULAR}
          element={<SortedUsersCardsPage contentType={true} />}
        />
        <Route
          path={AppRoutes.NEWEST}
          element={<SortedUsersCardsPage contentType={false} />}
        />
        <Route path={AppRoutes.ABOUT} element={<AboutPage />} />
        <Route
          path={AppRoutes.FAVORITES}
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route path={AppRoutes.REGISTRATION} element={<Registration />} />
        <Route path={AppRoutes.SKILL} element={<SkillPage />} />
        <Route
          path={AppRoutes.PROFILE}
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoutes.ERROR500} element={<Error500Page />} />
        <Route path={AppRoutes.ERROR404} element={<Error404Page />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
