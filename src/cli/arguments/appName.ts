import { ParsedArgumentsObject } from '@caporal/core';

export function getAppNameArgumentDefinition(): [string, string] {
  return ['<appName>', 'Name for the Roku app'];
}

export function getAppName(args: ParsedArgumentsObject): string {
  return args.appName as string;
}
