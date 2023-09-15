import { ParsedArgumentsObject } from '@caporal/core';

export function getNodeIdArgumentDefinition(): [string, string] {
  return ['[nodeId]', 'Node identifier to find'];
}

export function getNodeId(args: ParsedArgumentsObject): string {
  return args.nodeId as string;
}
