import { ParsedArgumentsObject } from '@caporal/core';

export function getInputQueryArgumentDefinition(): [string, string] {
  return ['<inputQuery>', 'Input query params eg. contentID=contendId123&mediaType=episode'];
}

export function getInputQuery(args: ParsedArgumentsObject): string {
  return args.inputQuery as string;
}
