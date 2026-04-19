import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => {
  return {
    boot: ['axios'],

    css: ['app.scss'],

    extras: [
      'roboto-font',
      'material-icons'
    ],

    build: {
      vueRouterMode: 'hash',

      esbuildTarget: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20'
      }
    },

    devServer: {
      open: true
    },

    framework: {
      plugins: ['Notify', 'Dialog', 'Loading', 'LocalStorage']
    },

    animations: [],

    ssr: {
      prodPort: 3000,
      middlewares: ['render'],
      pwa: false
    },

    pwa: {
      workboxMode: 'GenerateSW'
    },

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      bundler: 'packager',
      builder: {
        appId: 'foodhub-project'
      }
    },

    bex: {
      extraScripts: []
    }
  }
})
