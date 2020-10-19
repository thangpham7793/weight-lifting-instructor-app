import React from "react"
import ReactDOM from "react-dom"
import "./style/resetBrowserStyle.css"
import "./style/style.css"

// import App from "./App"
import AppControl from "./AppControl"
import store from "./app/store"
import { Provider } from "react-redux"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppControl />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
