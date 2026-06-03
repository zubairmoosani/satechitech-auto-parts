import { ReactNode } from 'react'
import AdminLayout from './components/AdminLayout'

/** Admin pages use MongoDB — skip static prerender on Vercel build */
export const dynamic = 'force-dynamic'

const layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
};

export default layout;
