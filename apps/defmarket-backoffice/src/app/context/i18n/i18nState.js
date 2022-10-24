import React, { useReducer } from 'react';
import I18nContext from './i18nContext';
import I18nReducer from './i18nReducer';
import I18nProvider from '../../extensions/i18n';
import { SET_LOCALEDATA } from '../types';

// import { IntlProvider } from 'react-intl';

const I18nState = (props) => {
  const initialState = {
    locale: 'fr',
  };

  const [state, dispatch] = useReducer(I18nReducer, initialState);

  const UpdateLocaleData = async (locale) => {
    dispatch({
      type: SET_LOCALEDATA,
      locale: locale,
    });
  };

  return (
    <I18nContext.Provider
      value={{
        locale: state.locale,
        UpdateLocaleData,
      }}
    >
      <I18nProvider locale={state.locale}>{props.children}</I18nProvider>
    </I18nContext.Provider>
  );
};

export default I18nState;
