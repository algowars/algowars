import { ReactNode } from 'react';
import { Head } from '../seo';

type Props = {
  children?: ReactNode;
};

const LandingLayout = ({ children }: Props) => {
  return (
    <>
      <Head title="Algowars" />
      <div className="flex flex-col min-h-screen">
        <header></header>
        <main className="grow">{children}</main>
      </div>
    </>
  );
};

export default LandingLayout;
