import type { __ENTITY__ } from '../../type';

type __ENTITY__DetailViewProps = {
  entity: __ENTITY__;
};

export function __ENTITY__DetailView({ entity }: __ENTITY__DetailViewProps) {
  return (
    <article>
      <h2>{entity.id}</h2>
    </article>
  );
}
