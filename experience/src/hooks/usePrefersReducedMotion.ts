import { useEffect, useState } from 'react';

import { getReducedMotionQuery } from '../utils/matchMedia';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => getReducedMotionQuery()?.matches ?? false);

  useEffect(() => {
    const query = getReducedMotionQuery();
    if (!query) return;
    const onChange = () => setReduced(query.matches);
    setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}