import App from './App.vue'
// Plugins
import { registerPlugins } from '@/plugins'
import store from './stores/store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser,fas, faClock } from '@fortawesome/free-solid-svg-icons';
import { VDataTable } from 'vuetify/lib/components/index.mjs'
import VueTheMask from 'vue-the-mask'

// Components


// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(store);
library.add(faUser,fas,faClock);
app.component('font-awesome-icon',FontAwesomeIcon,VDataTable)
app.use(VueTheMask)
registerPlugins(app)

app.mount('#app')
