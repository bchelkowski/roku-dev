import { ParsedOptions } from '@caporal/core';

export function getEscapedOptionDefinition(): [string, string] {
  return ['-u, --escaped', 'Flag indicating if should escape characters'];
}

export function getEscaped(options: ParsedOptions): boolean {
  return options.escaped as boolean;
}
