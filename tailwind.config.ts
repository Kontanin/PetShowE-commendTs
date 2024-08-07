import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        amber: colors.amber,
        // Add more colors as needed
      },
      height: {
        '120': '120px',
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
};

export default config;
