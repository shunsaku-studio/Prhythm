import { fetch__ENTITY__ById } from './server';
import { __ENTITY__DetailView } from './view';

export { __ENTITY__DetailLoading } from './loading';

type __ENTITY__DetailProps = {
  id: string;
};

export async function __ENTITY__Detail({ id }: __ENTITY__DetailProps) {
  const entity = await fetch__ENTITY__ById(id);
  if (!entity) {
    return <p>Not found</p>;
  }
  return <__ENTITY__DetailView entity={entity} />;
}
