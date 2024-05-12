/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

const primary = {
    50: '#fdf2f6',
    100: '#fce7f0',
    200: '#fbcfe1',
    300: '#f8a9c8',
    400: '#f373a2',
    500: '#eb5185',
    600: '#d9295c',
    700: '#bc1a44',
    800: '#9c1838',
    900: '#821933',
    950: '#4f0819',
};

const secondary = {
    50: '#effbfc',
    100: '#d6f2f7',
    200: '#b1e6f0',
    300: '#7cd2e4',
    400: '#3fb6d1',
    500: '#2399b7',
    600: '#1f7794',
    700: '#21647d',
    800: '#235367',
    900: '#214658',
    950: '#112d3b',
}

const terciary = {
    50: '#fdf7ef',
    100: '#fbedd9',
    200: '#f6d7b2',
    300: '#f1bc80',
    400: '#ea974d',
    500: '#e57c2d',
    600: '#d66220',
    700: '#b24b1c',
    800: '#8e3c1e',
    900: '#73341b',
    950: '#3e180c',
}

module.exports = {
    content: [
        "./src/**/*.{html,scss,ts}"
    ],
    important: true,
    darkMode: 'media', // or 'class'
    theme: {
        colors: ({ colors }) => ({
            ...colors,
            ...{
                primary: {
                    ...primary,
                    DEFAULT: primary[500]
                },
                secondary: {
                    ...secondary,
                    DEFAULT: secondary[700]
                },
                terciary: {
                    ...terciary,
                    DEFAULT: terciary[500]
                },
                fundo: '#1b1c1f'
            }
        }),
        extend: {
            fontFamily: {
                sans: `"Montserrat", ${defaultTheme.fontFamily.sans.join(',')}`,
                display: `"Montserrat", ${defaultTheme.fontFamily.sans.join(',`')}`,
                mono: `"IBM Plex Mono", ${defaultTheme.fontFamily.mono.join(',')}`
            },
        }
    }
}

