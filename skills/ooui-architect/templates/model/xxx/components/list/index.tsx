import { fetch__ENTITY__s } from './server';
import { __ENTITY__ListView } from './view';

export { __ENTITY__ListLoading } from './loading';

export async function __ENTITY__List() {
  const entities = await fetch__ENTITY__s();
  return <__ENTITY__ListView entities={entities} />;
}
