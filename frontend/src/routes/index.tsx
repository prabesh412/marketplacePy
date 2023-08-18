function path(root: string, subLink: string) {
  return `${root}${subLink}`;
}

const ROOTS_AUTH = '/auth';
// const ROOTS_DASHBOARD = '/dashboard';

export const index = {
  home: '/',
  login: '/users/login',
};

export const PATH_APP = {
  root: '/',
  contact: '/contact',
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  logout: path(ROOTS_AUTH, '/logout'),
  forgetPassword: path(ROOTS_AUTH, '/forget-password'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};
