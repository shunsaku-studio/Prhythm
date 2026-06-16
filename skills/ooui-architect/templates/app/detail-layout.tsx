import type { ReactNode } from 'react';

type __ENTITY__DetailLayoutProps = {
  children: ReactNode;
};

export default async function __ENTITY__DetailLayout({
  children,
}: __ENTITY__DetailLayoutProps) {
  // TODO: fetch server state and inject Provider when needed
  return <>{children}</>;
}
