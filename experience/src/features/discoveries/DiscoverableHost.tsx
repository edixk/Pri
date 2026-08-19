import { Discoverable } from '../../components/interactive/Discoverable';
import { useInteraction } from '../interactions/InteractionContext';
import { discoveries } from './discoveries';

function StarGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-gold"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2 L13.8 10.2 L22 12 L13.8 13.8 L12 22 L10.2 13.8 L2 12 L10.2 10.2 Z" />
    </svg>
  );
}

function PetalGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-rose-light" aria-hidden="true">
      <path
        d="M12 2 C 15 6, 18 10, 17 14 C 16.2 17.5, 14 20, 12 22 C 10 20, 7.8 17.5, 7 14 C 6 10, 9 6, 12 2 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DiscoverableHost() {
  const { isResolved, resolve } = useInteraction();

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {discoveries.map((discovery) => (
        <Discoverable
          key={discovery.id}
          label={discovery.ariaLabel}
          resolved={isResolved(discovery.id)}
          onReveal={() => resolve(discovery.id, discovery.message)}
          className={discovery.positionClass}
        >
          {discovery.variant === 'star' ? <StarGlyph /> : <PetalGlyph />}
        </Discoverable>
      ))}
    </div>
  );
}