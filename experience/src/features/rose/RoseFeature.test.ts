import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createInteractionValue, interactionWrapper } from '../../test/harness';
import { useRose } from './RoseFeature';

describe('useRose', () => {
  it('transita idle → revealing → revealed al tocar según la configuración', () => {
    const resolve = vi.fn();
    const wrapper = interactionWrapper(
      createInteractionValue({ isResolved: () => false, resolve }),
    );
    const { result } = renderHook(() => useRose(), { wrapper });

    expect(result.current.state).toBe('idle');

    act(() => result.current.handleClick());
    expect(result.current.state).toBe('revealing');

    act(() => result.current.handleClick());
    expect(result.current.state).toBe('revealed');
    expect(resolve).toHaveBeenCalledTimes(1);
    expect(resolve.mock.calls[0][0]).toBe('rose');
  });

  it('no vuelve a revelar cuando ya está resuelta', () => {
    const resolve = vi.fn();
    const wrapper = interactionWrapper(
      createInteractionValue({ isResolved: () => true, resolve }),
    );
    const { result } = renderHook(() => useRose(), { wrapper });

    act(() => result.current.handleClick());

    expect(resolve).not.toHaveBeenCalled();
    expect(result.current.state).toBe('idle');
  });
});