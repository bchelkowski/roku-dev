import { ParsedOptions } from '@caporal/core';

export function getPasswordOptionDefinition(): [string, string] {
  return ['-p --password <password>', 'Roku Device developer password'];
}

export function getPassword(options: ParsedOptions): string {
  return options.password as string;
}
