import { CreateArgumentOpts, ParsedArgumentsObject } from '@caporal/core';

type dynamicType<T> = T;

export function getTypeArgumentDefinition(description: string, options: CreateArgumentOpts): [string, string, CreateArgumentOpts] {
  return ['[type]', description, options];
}

export function getType<T>(args: ParsedArgumentsObject): dynamicType<T> {
  return args.type as dynamicType<T>;
}
