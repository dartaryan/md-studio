// utils/index.js
export const createPageUrl = (pageName) => {
  if (!pageName || typeof pageName !== 'string') {
    return '/'; // Default or error path
  }
  return `/${pageName.toLowerCase()}`;
};
