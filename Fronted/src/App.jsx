import { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import Home from "./Pages/Home";


export default function App() {
  const [loader, setLoader] = useState(JSON.parse(sessionStorage.getItem('values')) ?? true);

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        setLoader(false);
        sessionStorage.setItem('values', JSON.stringify(false));
      }, 5000);
    }
  }, [loader]);

  return (
    <>
      {loader ? <Loader /> : <Home />}
    </>
  );
}
