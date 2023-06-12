// eslint-disable-next-line no-undef
const {
  getTailwindConfig: getTailwindConfigRG,
} = require('configs-brand-rg/tailwind.config');
const {
  getTailwindConfig: getTailwindConfigExplorer,
} = require('configs-brand-explorer/tailwind.config');

function getConfig(params) {
  if (process.env.VITE_BRAND === 'EXPLORER') {
    return getTailwindConfigExplorer(params);
  }

  return getTailwindConfigRG(params);
}

// eslint-disable-next-line no-undef
module.exports = getConfig({
  purge: ['src/**/*.{vue,js,ts,jsx,tsx}'],
});
