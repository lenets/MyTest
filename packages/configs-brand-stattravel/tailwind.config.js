const {
  getTailwindConfig: _getConfig,
} = require('configs-common/tailwind.config');

function getTailwindConfig({ purge }) {
  return _getConfig({
    brandStyles: {
      colorPrimary: '#0065BD',
      colorPrimaryLight: '#007353',
      colorPrimaryLighter: '#0065bd66',
      colorPrimaryDark: '#1B365D',

      colorSecondary: '#D24701',
      colorSecondaryLight: '#D24701',
      colorSecondaryLighter: '#D24701',

      colorThird: '#D9D9D9',
    },
    brandFontPrimary: 'Titillium Web',
    brandFontSecondary: 'Titillium Web',
    purge,
  });
}

module.exports = { getTailwindConfig };