import equal from 'fast-deep-equal';

/**
 * Fields to compute in diff
 */
export enum DiffField {
  Added = 'added',
  Removed = 'removed',
  Changed = 'changed',
}

/** All fields by default */
export const DEFAULT_DIFF_FIELDS = [DiffField.Added, DiffField.Removed, DiffField.Changed];

/**
 * List comparison result
 */
export interface Diff<T> {
  /** New items (in current, not in previous) */
  added: T[];
  /** Removed items (in previous, not in current) */
  removed: T[];
  /** Changed items (current data) */
  changed: T[];
}

/**
 * Compare two lists by id and return differences
 *
 * @example
 * ```typescript
 * // All fields (default)
 * const diff = diffById(previousBanners, currentBanners);
 *
 * // Only added and removed (without object comparison)
 * const diff = diffById(prev, curr, [DiffField.Added, DiffField.Removed]);
 * ```
 */
export function diffById<T extends { id: number }>(
  previous: T[],
  current: T[],
  fields: DiffField[] = DEFAULT_DIFF_FIELDS,
): Diff<T> {
  const previousMap = new Map(previous.map((item) => [item.id, item]));
  const currentMap = new Map(current.map((item) => [item.id, item]));

  const added: T[] = [];
  const removed: T[] = [];
  const changed: T[] = [];

  const calcAdded = fields.includes(DiffField.Added);
  const calcRemoved = fields.includes(DiffField.Removed);
  const calcChanged = fields.includes(DiffField.Changed);

  for (const item of current) {
    const prev = previousMap.get(item.id);
    if (!prev) {
      if (calcAdded) added.push(item);
    } else if (calcChanged && !equal(prev, item)) {
      changed.push(item);
    }
  }

  if (calcRemoved) {
    for (const item of previous) {
      if (!currentMap.has(item.id)) {
        removed.push(item);
      }
    }
  }

  return { added, removed, changed };
}
