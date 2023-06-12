const {
  getTailwindConfig: _getConfig,
} = require('configs-common/tailwind.config');

function getTailwindConfig({ purge }) {
  return _getConfig({
    brandStyles: {
      colorPrimary: '#008560',
      colorPrimaryLight: '#007353',
      colorPrimaryLighter: '#0085604d',
      colorPrimaryDark: '#000',

      colorSecondary: '#D24701',
      colorSecondaryLight: '#D24701',
      colorSecondaryLighter: '#D24701',

      colorThird: '#D9D9D9',
    },
    brandFontPrimary: 'Nunito',
    brandFontSecondary: 'Montserrat',
    purge,
  });
}

module.exports = { getTailwindConfig };