// import Style from './Layout.module.css';

import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />

      <main className="py-20 px-4">
        <div className="container mx-auto px-3">
          <Outlet />
        </div>
      </main>

      
      <div className="hidden"></div>
    </>
  );
}
