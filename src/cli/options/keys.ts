import { ParsedOptions } from '@caporal/core';

export function getKeysOptionDefinition(): [string, string] {
  return ['-k, --keys <keys>','Keys split with "|"'];
}

export function getKeys(options: ParsedOptions): string {
  return options.keys as string;
}
