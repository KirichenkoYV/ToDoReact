import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './views/App/index'

import './views/App/styles/reset.scss'
import './views/App/styles/common.scss' 

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App />
)
