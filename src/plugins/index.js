/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// PluginstransformItems
import vuetify from './vuetify'
import router from '../router'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
}
