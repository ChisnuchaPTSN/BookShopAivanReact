import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <div>
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
