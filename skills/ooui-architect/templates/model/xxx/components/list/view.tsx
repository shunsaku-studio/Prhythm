import type { __ENTITY__ } from '../../type';

type __ENTITY__ListViewProps = {
  entities: __ENTITY__[];
};

export function __ENTITY__ListView({ entities }: __ENTITY__ListViewProps) {
  return (
    <ul>
      {entities.map((entity) => (
        <li key={entity.id}>{entity.id}</li>
      ))}
    </ul>
  );
}
