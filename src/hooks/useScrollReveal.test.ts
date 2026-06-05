import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollReveal } from './useScrollReveal';

describe('useScrollReveal', () => {
  let observeMock = vi.fn();
  let disconnectMock = vi.fn();
  let unobserveMock = vi.fn();

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();
    unobserveMock = vi.fn();

    global.IntersectionObserver = vi.fn().mockImplementation(function () {
      return {
        observe: observeMock,
        disconnect: disconnectMock,
        unobserve: unobserveMock,
      };
    });
  });

  it('initializes as not visible', () => {
    const { result } = renderHook(() => useScrollReveal());
    const [, isVisible] = result.current;
    expect(isVisible).toBe(false);
  });

  it('instantiates IntersectionObserver', () => {
    renderHook(() => useScrollReveal());
    expect(global.IntersectionObserver).toHaveBeenCalled();
  });
});
