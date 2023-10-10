
function path(root: string, subLink: string) {
  return `${root}${subLink}`;
}

export const ROOTS_AUTH = '/users/auth';
// const ROOTS_DASHBOARD = '/user/dashboard';

export const PATH_APP = {
  root: '/',
  contact: '/contact',
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  logout: path(ROOTS_AUTH, '/logout'),
  forgetPassword: path(ROOTS_AUTH, '/forget-password'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};
