import React, { useEffect } from "react";
import MainRoute from "./routes/MainRoute";
import getCurrentUser from "./customHooks/getCurrentUser";
import getCreatorCourse from "./customHooks/getCreatorCourse";
import getPublishedCourse from "./customHooks/getPublishedCourse";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  getCurrentUser();
  getCreatorCourse();
  getPublishedCourse();
  return (
    <>
      <ScrollToTop/>
      <div>
        <MainRoute />
      </div>
    </>
  );
};

export default App;
