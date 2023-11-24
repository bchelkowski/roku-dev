import { ParsedArgumentsObject } from '@caporal/core';

export function getFieldArgumentDefinition(): [string, string] {
  return ['[field]', 'Field of the data object that should be picked'];
}

export function getField(args: ParsedArgumentsObject): string {
  return args.field as string;
}
