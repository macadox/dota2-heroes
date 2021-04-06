import React from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import Error from "../common/Error";
import Footer from "../common/Footer";

const ErrorPage = () => {
  const { loading } = useGlobalContext();
  return (
    <>
      <div className='page-wrap page-wrap--error'>
        <Error />
      </div>
      {/* Footer included here for CLS  performance*/}
      {!loading && <Footer />}
    </>
  );
};

export default ErrorPage;
