import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner = () => {
  return <ClipLoader color={"#FACC15"} loading={true} size={150} />;
};

export default LoadingSpinner;
