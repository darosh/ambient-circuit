import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

localStorage.debug = '0'

const app = mount(App, {
	target: <Element>document.getElementById('app')
})

export default app
