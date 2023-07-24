import { useRecoilValue } from "recoil";
import { userData } from "../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Authentication = (props) => {
  const navigate = useNavigate();
  const auth = useRecoilValue(userData);

  useEffect(() => {
    if (!auth.username) {
      navigate("/login");
    }
  }, []);

  return props.children;
};
