import { ParsedArgumentsObject } from '@caporal/core';

export function getPasswordArgumentDefinition(): [string, string] {
  return ['[password]', 'Developer password for package generation'];
}

export function getPassword(args: ParsedArgumentsObject): string {
  return args.password as string;
}
