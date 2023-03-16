import { useEffect, useState } from "react";

function useWindowOnBeforeUnload() {
  const [enable, setEnable] = useState(false);
  useEffect(() => {
    window.onbeforeunload = () => {
      if (enable) {
        return true;
      }
    };
  }, [enable]);

  return { setEnable };
}

export default useWindowOnBeforeUnload;
