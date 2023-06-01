import * as React from 'react';
import { useRouter } from 'next/router';

export interface ParamsPageProps {
}

export default function ParamsPage (props: ParamsPageProps) {
    const router = useRouter()

  return (
    <div>
      <h1>Params page</h1>

      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  );
}