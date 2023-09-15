import { ParsedArgumentsObject } from '@caporal/core';

export function getKeyArgumentDefinition(): [string, string] {
  return ['<key>', 'Key to pass'];
}

export function getKey(args: ParsedArgumentsObject): string {
  return args.key as string;
}
