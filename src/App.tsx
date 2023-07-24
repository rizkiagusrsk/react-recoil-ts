// import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Router } from "./router";
import { useRecoilValue } from "recoil";
import { userData } from "./store";

function App() {
  const user = useRecoilValue(userData);
  return (
    <>
      {user.username ? <Navbar /> : ""}
      <Router />
    </>
  );
}

export default App;
