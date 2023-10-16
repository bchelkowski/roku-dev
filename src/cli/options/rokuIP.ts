import { ParsedOptions } from '@caporal/core';

export function getRokuIPOptionDefinition(): [string, string] {
  return ['--ip <rokuIP>', 'Roku Device IP'];
}

export function getRokuIP(options: ParsedOptions): string {
  return options.ip as string;
}
