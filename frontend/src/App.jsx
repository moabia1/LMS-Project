import React, { useEffect } from "react";
import MainRoute from "./routes/MainRoute";
import getCurrentUser from "./customHooks/getCurrentUser";
import getCreatorCourse from "./customHooks/getCreatorCourse";
import getPublishedCourse from "./customHooks/getPublishedCourse";

const App = () => {
  getCurrentUser();
  getCreatorCourse();
  getPublishedCourse();
  return (
    <>
      <div>
        <MainRoute />
      </div>
    </>
  );
};

export default App;
