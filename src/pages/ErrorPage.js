import React from "react";
import Error from "../components/Error";
import { useGlobalContext } from "../context";
import Footer from "../components/Footer";

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
