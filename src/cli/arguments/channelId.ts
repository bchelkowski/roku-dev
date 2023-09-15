import { ParsedArgumentsObject } from '@caporal/core';

export function getChannelIdArgumentDefinition(): [string, string] {
  return ['[channelId]', 'Id of the channel'];
}

export function getChannelId(args: ParsedArgumentsObject): string {
  return args.channelId as string;
}
