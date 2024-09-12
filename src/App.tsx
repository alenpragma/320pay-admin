/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { useEffect, useState } from "react";
import useColorMode from "./hooks/useColorMode";
import MyContext from "./hooks/MyContext";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  // const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [colorMode] = useColorMode();

  const [theme, setTheme] = useState<string | any>(colorMode);

  const contextValues = {
    theme,
    setTheme,
  };

  return (
    <>
      <MyContext.Provider value={contextValues}>
        <SkeletonTheme
          baseColor={`${colorMode === "light" ? "#e5e6ea" : "#e5e6ee"}`}
          highlightColor="#47566c"
        >
          <ToastContainer />
          <MainLayout />
        </SkeletonTheme>
      </MyContext.Provider>
    </>
  );
}

export default App;
