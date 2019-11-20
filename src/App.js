import React from "react";
import "./App.css";
import Header from "./Component/Header";
import routes from "./routes";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Header />
          {routes}
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
