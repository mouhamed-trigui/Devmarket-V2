import { SET_LOCALEDATA } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOCALEDATA:
      return { ...state, locale: action.locale };

    default:
      return state;
  }
};
