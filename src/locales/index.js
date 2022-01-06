import intl from 'react-intl-universal';

const locales = {
  en: require('./en.json'),
  zh: require('./zh.json')
}
const loadLocales = () => {
  intl.init({
    currentLocale: localStorage.getItem('lang_type') || 'zh',
    locales,
  })
}
export default loadLocales