import React from 'react'
import ReactDOM from 'react-dom/client'
import Provider from '@/helpers/Context.jsx'
import App from './App'
import '@/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
)
