import React, { useEffect } from "react";
import MainRoute from "./routes/MainRoute";
import getCurrentUser from "./customHooks/getCurrentUser";

const App = () => {
  getCurrentUser();

  return (
    <>
      <div>
        <MainRoute />
      </div>
    </>
  );
};

export default App;
