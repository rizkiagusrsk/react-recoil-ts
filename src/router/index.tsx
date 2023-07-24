import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Pokemon } from "../pages/Pokemon";
import { Login } from "../pages/Login";
import { Authentication } from "../middleware/authentication";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Authentication>
              <Pokemon />
            </Authentication>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
