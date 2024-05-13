import React from "react";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes/Routes";
import RouterCombiner from "./routes/RouteCombiner";

function App() {
  return (
    <>
      <BrowserRouter>
        <RouterCombiner routes={routes} />
      </BrowserRouter>
    </>
  );
}

export default App;
