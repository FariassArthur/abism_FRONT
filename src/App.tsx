/* import { useState } from 'react' */
import "./App.scss";

//router
import { Routes, Route } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "./store";

//pages
import Home from "./pages/Home";
import Signin from "./pages/SignIn/SignIn";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Provider>
  );
}

export default App;
