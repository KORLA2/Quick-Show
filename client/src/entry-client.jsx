import {hydrateRoot} from 'react-dom/client'
import App from './App'
import "./index.css"
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from "../utils/store.ts";
hydrateRoot(document.getElementById('root'),<Provider store={store}>
<BrowserRouter><App/></BrowserRouter>
</Provider>
)