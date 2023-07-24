import { useSetRecoilState } from "recoil";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { useState } from "react";
import { userData } from "../store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userData);
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const doLogin = () => {
    if (!email || !password) {
      window.alert("please enter your login data");
      return;
    }
    setUser({
      username: email,
      password: password,
    });
    navigate("/");
  };
  return (
    <div className="tw-flex tw-flex-col tw-gap-y-2 tw-items-center tw-mx-auto tw-mt-10">
      <div className="tw-flex tw-flex-row">
        <img src={reactLogo} alt="Logo React" width={80} />
        <img src={viteLogo} alt="Logo Vite" width={80} />
      </div>
      <input
        value={email}
        type="text"
        onChange={onChangeEmail}
        placeholder="input email"
        className="tw-p-2 tw-rounded-md"
      />
      <input
        value={password}
        type="password"
        onChange={onChangePassword}
        placeholder="input password"
        className="tw-p-2 tw-rounded-md"
      />

      <button
        className="tw-text-white tw-p-2 tw-rounded-md tw-bg-stone-800 hover:tw-bg-gray-900"
        onClick={doLogin}
      >
        Login
      </button>
    </div>
  );
};
