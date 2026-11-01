import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import './index.css'
import App from './components/App'
import { initAnalytics } from './utils/analytics'

initAnalytics()

// The select screen's fonts (all preloaded in index.html). Rendering waits for them, so its text never shows in a
// fallback font and then reflows, moving the industry select. A slow font gives up after maxFontWaitMs.
const selectScreenFonts = ['400 16px Inter', '400 16px "PP Monument Wide"', '900 16px "PP Monument Wide"', '900 16px "PP Monument Extended"']
const maxFontWaitMs = 3000

function render() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

Promise.race([
  Promise.all(selectScreenFonts.map(font => document.fonts.load(font))),
  new Promise(resolve => setTimeout(resolve, maxFontWaitMs)),
]).then(render, render)
