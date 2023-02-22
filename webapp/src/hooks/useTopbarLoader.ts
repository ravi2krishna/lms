import { useEffect } from "react";
import topbar from "topbar";

function useTopbarLoader(showLoader: boolean) {
  useEffect(() => {
    if (showLoader) {
      topbar.show();
    } else {
      topbar.hide();
    }
  }, [showLoader]);
}

export default useTopbarLoader;
