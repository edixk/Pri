import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createInteractionValue, interactionWrapper } from '../../test/harness';
import { useChick } from './ChickFeature';

describe('useChick', () => {
  it('asoma, avisa al primer toque y revela al tercero', () => {
    vi.useFakeTimers();
    const emit = vi.fn();
    const resolve = vi.fn();
    const wrapper = interactionWrapper(
      createInteractionValue({ isResolved: () => false, emit, resolve }),
    );
    const { result } = renderHook(() => useChick(), { wrapper });

    act(() => {
      vi.advanceTimersByTime(2600);
    });
    expect(result.current.state).toBe('peek');

    act(() => result.current.handleTap());
    expect(result.current.state).toBe('noticed');
    expect(emit).toHaveBeenCalledTimes(1);

    act(() => result.current.handleTap());
    expect(result.current.state).toBe('interaction');

    act(() => result.current.handleTap());
    expect(result.current.state).toBe('reaction');
    expect(resolve).toHaveBeenCalledTimes(1);
    expect(resolve.mock.calls[0][0]).toBe('chick');
  });

  it('sigue reaccionando tras resolverse sin volver a revelar', () => {
    const resolve = vi.fn();
    const wrapper = interactionWrapper(
      createInteractionValue({ isResolved: () => true, resolve }),
    );
    const { result } = renderHook(() => useChick(), { wrapper });

    act(() => result.current.handleTap());
    act(() => result.current.handleTap());

    expect(resolve).not.toHaveBeenCalled();
    expect(result.current.reaction).toBe('blink');
  });
});