/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

const primary = {
    50: '#ffffff',
    100: '#d2edf8',
    200: '#a1d9f1',
    300: '#63c0e7',
    400: '#49b5e3',
    500: '#2eaadf',
    600: '#209acf',
    700: '#1c86b4',
    800: '#18739a',
    900: '#135f7f'
};

const secondary = {
    50: '#92d4fb',
    100: '#48b8f8',
    200: '#12a3f6',
    300: '#0778b9',
    400: '#06659b',
    500: '#05527e',
    600: '#043f61',
    700: '#032c43',
    800: '#011926',
    900: '#000508'
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
            primary: {
                ...primary,
                DEFAULT: primary[500]
            },
            secondary: {
                ...secondary,
                DEFAULT: secondary[500]
            },
            fundo: '#1b1c1f'
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

