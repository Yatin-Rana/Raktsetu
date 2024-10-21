import { atom } from 'recoil';

const authState = atom({
  key: 'authState', // keeping the original key name
  default: {
    isLoggedIn: false,
    token: null
  },
});

// Using default export instead of named export
export default authState;
