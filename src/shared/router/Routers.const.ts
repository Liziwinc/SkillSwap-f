export const AppRoutes = {
  HOME: '/',
  REGISTRATION: '/registration',
  LOGIN: '/login',
  SKILL: '/skill/:id',
  FAVORITES: '/favorites',
  PROFILE: '/profile',
  ERROR404: '/*',
  ERROR500: '/500',
  POPULAR: '/popular',
  NEWEST: '/newest',
  ABOUT: '/about'
} as const;

export type Route = keyof typeof AppRoutes;
