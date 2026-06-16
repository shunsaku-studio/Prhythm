export const __entity__PathMapping = {
  indexPath: '/__route__',
  newPath: '/__route__/new',
  idToPath: (id: string) => `/__route__/${id}`,
  pathToId: (pathname: string) => pathname.split('/').pop() ?? null,
} as const;
