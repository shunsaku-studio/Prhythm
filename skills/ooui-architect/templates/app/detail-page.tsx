import { Suspense } from 'react';

import {
  __ENTITY__Detail,
  __ENTITY__DetailLoading,
} from '@/model/__entity__/components/detail';

type __ENTITY__DetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function __ENTITY__DetailPage({
  params,
}: __ENTITY__DetailPageProps) {
  const { id } = await params;
  return (
    <main>
      <Suspense fallback={<__ENTITY__DetailLoading />}>
        <__ENTITY__Detail id={id} />
      </Suspense>
    </main>
  );
}
