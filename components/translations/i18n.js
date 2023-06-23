import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';

const en = require('./locales/en.json');
const es = require('./locales/es.json');
const cn = require('./locales/cn.json');
const fr = require('./locales/fr.json');
const lh = require('./locales/lh.json');
const ire = require('./locales/ir.json');
const pol = require('./locales/pol.json');


i18n.translations = {
  en,
  es,
  cn,
  fr,
  lh,
  ire,
  pol
};

const fallback = { languageTag: "en", isRTL: false };

const { languageTag } = RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback;

i18n.locale = languageTag;

export default i18n;