import { useDocumentVisibility } from '../../hooks/useDocumentVisibility';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { PetalField } from '../visual/PetalField';
import { Starfield } from '../visual/Starfield';

export function AmbientBackground() {
  const visible = useDocumentVisibility();
  const reduced = usePrefersReducedMotion();
  const active = visible && !reduced;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="bg-night absolute inset-0" />
      <Starfield active={active} />
      <PetalField active={active} />
    </div>
  );
}