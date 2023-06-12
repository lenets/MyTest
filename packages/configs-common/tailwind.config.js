
function getTailwindConfig({
  brandStyles,
  brandFontPrimary,
  brandFontSecondary,
  purge,
  additionalComponents,
}) {
  return {
    purge: purge || [],
    darkMode: false, // or 'media' or 'class'
    theme: {
      screens: {
        // minWidth value for each breakpoint
        sm: '415px', // smartphone
        md: '768px', // vertical tablet
        lg: '1024px', // horizontal tablet | laptop
        xl: '1366px', // desktop | wide screen
        // maxWidth value for each breakpoint
        maxSm: { max: '767px' }, // up to smartphone screen size
      },
      container: {
        center: true,
      },
      colors: {
        transparent: 'transparent',
        white: '#fff',
        black: '#333',
        realblack: '#000',
        green: '#097C75',
        lightgrey: '#5E6282',

        orange: {
          lighter: '#fff1e3',
          light: '#ffa141',
          DEFAULT: '#',
        },
        primary: {
          lighter: brandStyles.colorPrimaryLighter,
          light: brandStyles.colorPrimaryLight,
          dark: brandStyles.colorPrimaryDark,
          DEFAULT: brandStyles.colorPrimary,
        },
        secondary: {
          light: brandStyles.colorSecondaryLight,
          lighter: brandStyles.colorSecondaryLighter,
          DEFAULT: brandStyles.colorSecondary,
        },
        third: {
          DEFAULT: brandStyles.colorThird,
        },
        grey: {
          lighter: '#f3f3f3',
          light: '#d8d8d8',
          DEFAULT: '#c4c4c4',
          dark: '#747474',
          darker: '#4d4d4d',
          darkest: '#3c3c3c',
        },
        red: {
          DEFAULT: '#E21F26',
          light: '#e84c52',
        },
      },

      fontSize: {
        base: '1rem',
        6: '0.375rem',
        8: '0.5rem',
        9: '0.5625rem',
        10: '0.625rem',
        12: '0.75rem',
        13: '0.8125rem',
        14: '0.875rem',
        16: '1rem',
        18: '1.125rem',
        20: '1.25rem',
        22: '1.375rem',
        24: '1.5rem',
        26: '1.625rem',
        28: '1.75rem',
        32: '2rem',
        36: '2.25rem',
        40: '2.5rem',
        42: '2.625rem',
        48: '3rem',
        62: '3.875rem',
        66: '4.1257rem',
      },

      spacing: {
        px: '1px',
        0: '0',
        2: '0.125rem',
        4: '0.25rem',
        6: '0.375rem',
        8: '0.5rem',
        10: '0.625rem',
        11: '0.6875rem',
        12: '0.75rem',
        13: '0.8125rem',
        14: '0.875rem',
        15: '0.9375rem',
        16: '1rem',
        18: '1.125rem',
        20: '1.25rem',
        22: '1.375rem',
        24: '1.5rem',
        25: '1.5625rem',
        28: '1.75rem',
        30: '1.875rem',
        32: '2rem',
        34: '2.125rem',
        36: '2.25rem',
        38: '2.375rem',
        39: '2.4375rem',
        40: '2.5rem',
        43: '2.688rem',
        44: '2.75rem',
        45: '2.8125rem',
        46: '2.875rem',
        48: '3rem',
        50: '3.125rem',
        53: '3.313rem',
        55: '3.4375rem',
        56: '3.5rem',
        60: '3.75rem',
        64: '4rem',
        70: '4.375rem',
        72: '4.5rem',
        80: '5rem',
        88: '5.5rem',
        96: '6rem',

        100: '6.25rem',
        110: '6.875rem',
        120: '7.5rem',
        128: '8rem',
        140: '8.75rem',
        150: '9.375rem',
        160: '10rem',
        164: '10.25rem',
        170: '10.625rem',
        180: '11.25rem',
        190: '11.875rem',

        200: '12.5rem',
        220: '13.75rem',
        230: '14.375rem',
        250: '15.635rem',
        260: '16.25rem',
        290: '18.125rem',

        300: '18.75rem',
        320: '20rem',
        325: '20.3125rem',
        350: '21.875rem',
        360: '22.5rem',
        380: '23.75rem',

        400: '25rem',
        445: '27.8125rem',

        500: '31.25rem',
        540: '33.75rem',
        572: '35.75rem',
        600: '37.5rem',

        700: '43.75rem',
      },
      fontFamily: {
        primary: [brandFontPrimary, 'Tahoma', 'Verdana', 'sans-serif'],
        secondary: [brandFontSecondary, 'Helvetica', 'Verdana', 'sans-serif'],
      },
      extend: {
        boxShadow: {
          top: '0 0 12px rgba(0, 0, 0, 0.4)',
          'box-1': '0 6px 10px rgba(0, 0, 0, 0.3)',
        },
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
      },
    },
    variants: {
      extend: {
        padding: ['last'],
        margin: ['last'],
      },
    },
    plugins: [
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      function ({ addComponents }) {
        addComponents({
          '.icon-primary-color': {
            stroke: brandStyles.colorPrimary,
            color: brandStyles.colorPrimary,
          },
          '.icon-secondary-color': {
            stroke: brandStyles.colorSecondary,
            color: brandStyles.colorSecondary,
          },
          '.error-message': {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#E21F26',
            marginTop: '12px',
          },

          '.main-container': {
            // 'border': '1px dotted #aaa',
            margin: '0 auto',
            maxWidth: '92%',
            '@screen sm': {
              maxWidth: '92%',
            },
            '@screen md': {
              maxWidth: '740px',
            },
            '@screen lg': {
              maxWidth: '970px',
            },
            '@screen xl': {
              maxWidth: '1300px',
            },
          },
          '.main-container-full': {
            margin: '0 auto',
            maxWidth: '100%',
            '@screen sm': {
              maxWidth: '100%',
            },
            '@screen md': {
              maxWidth: '740px',
            },
            '@screen lg': {
              maxWidth: '970px',
            },
            '@screen xl': {
              maxWidth: '1300px',
            },
          },
          '.content-container': {
            // 'border': '1px dotted #ccc',
            margin: '0 auto',
            maxWidth: '100%',
            'font-size': '18px',
            // 'p': {
            //   'line-height': '1.7rem',
            // },
            '@screen sm': {
              maxWidth: '100%',
            },
            '@screen md': {
              maxWidth: '740px',
            },
            '@screen lg': {
              maxWidth: '970px',
            },
            '@screen xl': {
              maxWidth: '1040px',
            },
          },
          '.content-account': {
            margin: '0 auto',
            maxWidth: '100%',
            '@screen md': {
              'max-width': '716px',
            },
          },
          '.sail-main-container': {
            // 'border': '1px dotted brown',
            width: '92%',
            '@screen sm': {
              maxWidth: '488px',
            },
            '@screen lg': {
              maxWidth: '512px',
              marginRight: '42px',
              width: '100%',
            },
          },
          '.sidebar-container': {
            display: 'none',
            '@screen lg': {
              width: '310px',
              display: 'block',
            },
          },
          '.nav-container': {
            margin: '0 auto',
            '@screen sm': {
              maxWidth: '92%',
            },
            '@screen md': {
              maxWidth: '758px',
            },
            '@screen lg': {
              maxWidth: '1014px',
            },
            '@screen xl': {
              maxWidth: '1300px',
            },
          },

          ...additionalComponents,
        });
      },
    ],
    safelist: ['stroke-current', 'fill-current'],
  };
}

module.exports = { getTailwindConfig };
