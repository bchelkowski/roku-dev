import { ParsedArgumentsObject } from '@caporal/core';

export function getPathArgumentDefinition(description: string): [string, string] {
  return ['[path]', description];
}

export function getPath(args: ParsedArgumentsObject): string {
  return args.path as string;
}
