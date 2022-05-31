import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';
import pt from 'vuetify/src/locale/pt';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt'
  },
  icons: {
    iconfont: 'mdi'
  },
  breakpoint: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 320,
      sm: 650,
      md: 800,
      lg: 1280
    },
    scrollBarWidth: 24
  },
  theme: {
    themes: {
      light: {
        primary: '#e23636',
        secondary: colors.amber.lighten1,
        error: colors.red.accent1,
        success: colors.green.lighten1
      },
      dark: {
        primary: colors.red.darken4,
        secondary: colors.amber.darken4,
        error: colors.red.accent4,
        success: colors.green.lighten1
      }
    }
  }
});
