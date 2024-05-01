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
import Poems from "./pages/Poems/Poems";
import Poem from "./pages/Poem/Poem"

function App() {
  return (
    <div id="app">
      <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/poems" element={<Poems />} />
        <Route path="/poem" element={<Poem />} />
      </Routes>
    </Provider>
    </div>
    
  );
}

export default App;
