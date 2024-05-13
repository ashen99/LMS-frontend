import React, { ReactNode } from "react";
import HeaderNav from "../common/Header";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <HeaderNav />
      <>{children}</>
      {/* <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer> */}
    </div>
  );
};

export default MainLayout;
