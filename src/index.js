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

//Use it to access match.params of the current <Route>.

// import React from "react"
// import ReactDOM from "react-dom"
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   useParams,
// } from "react-router-dom"

// function BlogPost() {
//   let { slug } = useParams()
//   return <div>Now showing post {slug}</div>
// }

// ReactDOM.render(
//   <Router>
//     <Switch>
//       <Route exact path="/">
//         {() => <div>Home</div>}
//       </Route>
//       <Route path="/blog/:slug" component={BlogPost} />
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// )
