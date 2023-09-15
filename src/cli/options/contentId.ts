import { ParsedOptions } from '@caporal/core';

export function getContentIdOptionDefinition(): [string, string] {
  return ['--contentId <contentId>', 'Deeplink content identifier'];
}

export function getContentId(options: ParsedOptions): string {
  return options.contentId as string;
}
