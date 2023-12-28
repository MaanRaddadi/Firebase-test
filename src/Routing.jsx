import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";

import SimpleForm from "./SimpleForm";
import SignIn from "./SignIn";
function Routing() {
  return (
    <>
      <Routes>
        <Route path="/signUp" element={<Auth />}></Route>
        <Route path="/" element={<SimpleForm />}></Route>
        <Route path="/signIn" element={<SignIn></SignIn>}></Route>
      </Routes>
    </>
  );
}

export default Routing;
