import { Suspense } from 'react';

import {
  __ENTITY__List,
  __ENTITY__ListLoading,
} from '@/model/__entity__/components/list';

export default async function __ENTITY__ListPage() {
  return (
    <main>
      <h1>__label__</h1>
      <Suspense fallback={<__ENTITY__ListLoading />}>
        <__ENTITY__List />
      </Suspense>
    </main>
  );
}
