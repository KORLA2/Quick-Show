import {renderToString} from 'react-dom/server' 
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter, StaticRouter } from 'react-router-dom'
import { store } from "../utils/store.ts";
/**
 * @param {string} _url
 */

export function render(url){
  return (
    renderToString( <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>)
  )
}

