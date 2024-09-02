import { Layout } from '@/components/layouts/layout';
import { DocsNav } from '@/features/docs/components/docs-nav/docs-nav';

export const DocsRoute = () => {
  return (
    <Layout title="Docs">
      <div className="container grid grid-cols-12 gap-5">
        <aside className="col-span-2 border">
          <DocsNav links={[]} />
        </aside>
        <section className="col-span-8">
          <header className="py-6">
            <h1 className="text-3xl font-semibold">Algowars Documentation</h1>
          </header>
        </section>
        <aside className="col-span-2">
          <h3>TESTING</h3>
        </aside>
      </div>
    </Layout>
  );
};
