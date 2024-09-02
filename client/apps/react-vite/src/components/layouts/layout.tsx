import { ReactNode } from 'react';
import { Head } from '../seo';
import { Navbar } from '../navbars/navbar';

type Props = {
  children?: ReactNode;
  title: string;
};

export const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head title={title} />
      <div className="flex flex-col min-h-screen relative">
        <header>
          <Navbar />
        </header>
        <main className="grow">{children}</main>
      </div>
    </>
  );
};
