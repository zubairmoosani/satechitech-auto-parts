import { ReactNode } from "react";
import AdminLayout from "./components/AdminLayout";

const layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
};

export default layout;
