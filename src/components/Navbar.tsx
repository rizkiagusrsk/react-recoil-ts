import { useRecoilValue } from "recoil";
import viteLogo from "/vite.svg";
import { userData } from "../store";

export const Navbar = () => {
  const user = useRecoilValue(userData);
  return (
    <>
      <div className="tw-flex tw-justify-between tw-mx-auto tw-mt-4">
        <div className="tw-flex tw-items-center tw-gap-x-4">
          <img src={viteLogo} alt="Logo React" width={40} />
          <div className="tw-text-white">List Pokemon</div>
        </div>
        <div className="tw-text-white ">{user.username}</div>
      </div>
    </>
  );
};
