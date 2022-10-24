import React from 'react';
import 'intl';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import { LOCALES } from './locales';
import EN from './distribution/en.json';
import FR from './distribution/fr.json';

function loadLocaleData(locale) {
  switch (locale) {
    case 'en':
      return EN;
    default:
      return FR;
  }
}

const Provider = ({ children, locale }) => (
  <IntlProvider locale={locale} messages={loadLocaleData(locale)}>
    {children}
  </IntlProvider>
);

Provider.displayName = 'I18nProvider';

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  locale: PropTypes.oneOf(Object.values(LOCALES)),
};

Provider.defaultProps = {
  locale: LOCALES.FRENCH,
};

export default Provider;
