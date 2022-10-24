import I18n from 'i18n-js';

//importing all languages
import en from './distribution/en.json';
import fr from './distribution/fr.json';

I18n.translations = {
    //define all imports
    en,
    fr
}

I18n.fallbacks = true;
export default I18n;
