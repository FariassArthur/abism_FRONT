/* import { useState } from 'react' */
import "./App.scss";

//router
import { Routes, Route } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "./store"

//pages
import Home from "./pages/Home";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Provider>
  );
}

export default App;
