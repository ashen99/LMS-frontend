import React from "react";
import { Route, Routes } from "react-router-dom";

interface RouteItem {
  path: string;
  Component: React.ComponentType<any>;
  Layout: React.ComponentType<any>;
}

interface RouterCombinerProps {
  routes: RouteItem[];
}

const RouterCombiner: React.FC<RouterCombinerProps> = ({ routes }) => {
  return (
    <Routes>
      {routes.map(({ path, Component, Layout }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <Component />
            </Layout>
          }
        />
      ))}
    </Routes>
  );
};

export default RouterCombiner;
