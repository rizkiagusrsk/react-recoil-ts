import { useRecoilValue, useSetRecoilState } from "recoil";
import { isMobile } from "../store";

export function useIsMobile() {
  const setMobileView = useSetRecoilState(isMobile);

  const mediaQuery = window.matchMedia("(min-width: 1024px)");
  mediaQuery.addEventListener("change", (event) => {
    setMobileView(!event.matches);
  });
  const isMobileView = useRecoilValue(isMobile);
  return isMobileView;
}
