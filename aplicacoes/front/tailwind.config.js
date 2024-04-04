/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

const primary = {
    50: '#FDF2F6',
    100: '#FCE7EF',
    200: '#FBCFE1',
    300: '#F8A9C7',
    400: '#F373A0',
    500: '#E93F76',
    600: '#D92959',
    700: '#BC1A41',
    800: '#9C1837',
    900: '#821931',
    950: '#4F0818',
};

const secondary = {
    50: '#EAFEFF',
    100: '#CAFBFF',
    200: '#9CF5FF',
    300: '#57EBFF',
    400: '#0CD6FF',
    500: '#00BAEA',
    600: '#0092C4',
    700: '#0075A0',
    800: '#0B5D7F',
    900: '#0E4D6B',
    950: '#02324A',
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
                DEFAULT: secondary[700]
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

