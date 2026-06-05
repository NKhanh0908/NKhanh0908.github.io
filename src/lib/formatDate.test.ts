import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats valid dates in English', () => {
    expect(formatDate('2025-08-15', 'en')).toBe('Aug 2025');
  });

  it('formats valid dates in Vietnamese', () => {
    const formatted = formatDate('2025-08-15', 'vi');
    expect(formatted).toContain('8');
    expect(formatted).toContain('2025');
  });

  it('returns original string for invalid dates', () => {
    expect(formatDate('invalid-date', 'en')).toBe('invalid-date');
  });
});
