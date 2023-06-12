// eslint-disable-next-line no-undef
const {
  getTailwindConfig: getTailwindConfigStattravel,
} = require('configs-brand-stattravel/tailwind.config');
const {
  getTailwindConfig: getTailwindConfigExplorer,
} = require('configs-brand-explorer/tailwind.config');

function getConfig(params) {
  if (process.env.VITE_SITE === 'EXPLORER') {
    return getTailwindConfigExplorer(params);
  }

  if (process.env.VITE_SITE === 'STATTRAVEL') {
    return getTailwindConfigStattravel(params);
  }

  return getTailwindConfigExplorer(params);
}

// eslint-disable-next-line no-undef
module.exports = getConfig({
  purge: [
    '../components-vue3/src/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
});
