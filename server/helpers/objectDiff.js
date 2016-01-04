import {diff} from 'deep-diff';

/**
 * Creates a nice array of changes for an object.
 * Intentionally filters out the updated_at property on entry objects to avoid
 * false change notifications.
 *
 *
 * @param former - the old value before changes were applied.
 * @param current - the new value after changes were applied.
 * @returns [String] - strings with 'value (action)'
 */
export default function objectDiff(former, current) {
  const changes = diff(former, current, function(path, key) {
    return ['firstName', 'lastName', 'summary', 'avatar', 'email', 'phone'].indexOf(key) < 0;
  });

  const nicenames = {
    N: 'added',
    D: 'removed',
    E: 'changed'
  };

  if (!changes) {
    return [];
  }

  return changes.map(function(entry){
    let action = nicenames[entry.kind];

    if (!entry.lhs && !entry.rhs) {
      return undefined;
    } else if (!entry.lhs && entry.rhs) {
      action = 'added';
    } else if (!entry.rhs) {
      action = 'removed';
    }

    return entry.path + ' (' + action + ')';
  }).filter(Boolean);
};
