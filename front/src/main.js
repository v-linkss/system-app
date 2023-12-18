import { VDataTable } from 'vuetify/lib/components/index.mjs'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.component(VDataTable)
registerPlugins(app)

app.mount('#app')
