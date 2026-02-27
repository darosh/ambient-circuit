import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

localStorage.debug = '0'
// localStorage.debug = '*'

const app = mount(App, {
	target: <Element>document.querySelector('#app')
})

export default app
