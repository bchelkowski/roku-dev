import { CreateArgumentOpts, ParsedArgumentsObject } from '@caporal/core';

type dynamicType<T> = T;

export function getCommandArgumentDefinition(description: string, options: CreateArgumentOpts): [string, string, CreateArgumentOpts] {
  return ['<command>', description, options];
}

export function getCommand<T>(args: ParsedArgumentsObject): dynamicType<T> {
  return args.command as dynamicType<T>;
}
