import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
        fontFamily: {
            'sans': ['Arimo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            'arimo': ['Arimo', 'sans-serif']
            },
        colors: {
            primary: '#061A40',
            secondary: '#31F9A9',
            ternary: '#93B5C6',
        }
    }
  }
} satisfies Config