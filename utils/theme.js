import { extendTheme } from 'native-base';

export default function () {
  const theme = extendTheme({
    colors: {
      // Add new color
      singletons: {
        white: '#ffffff',
        black: '#000000',
      },
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        800: '#185ADB',
      },
      yellow: {
        100: 'rgba(253, 184, 39, 0.65)',
        400: '#FDB827',
        500: '#F2BC1A',
      },
      gray: {
        100: '#f4f4f4',
        200: '#EDEAEA',
        300: '#455A64',
        400: '#37474F',
      },
      red: {
        100: '#F54A4A',
        500: '#FF0303',
      },
      green: {
        100: '#01FF2A',
        500: '#01FF2A',
      },
      dark: {
        100: '#c4c4c4',
        300: '#5E8090',
        400: '#263238',
      },
    },
    fontConfig: {
      Roboto: {
        100: {
          normal: 'Roboto-Light',
          italic: 'Roboto-LightItalic',
        },
        400: {
          normal: 'Roboto-Regular',
        },
        500: {
          normal: 'Roboto-Medium',
        },
        700: {
          normal: 'Roboto-Bold',
        },
      },
    },
    fonts: {
      heading: 'Roboto',
      body: 'Roboto',
      mono: 'Roboto',
    },
    components: {
      Button: {
        variants: {
          rounded: () => {
            return {
              rounded: 'full',
            };
          },
        },
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  });

  return theme;
}
