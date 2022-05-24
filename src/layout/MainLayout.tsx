import { Navbar } from "@components/index";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div>{children}</div>
    </main>
  );
};

export default MainLayout;
