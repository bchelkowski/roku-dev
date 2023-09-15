import { ParsedOptions } from '@caporal/core';

export function getSectionsOptionDefinition(): [string, string] {
  return ['-s, --sections <sections>','Sections split with "|"'];
}

export function getSections(options: ParsedOptions): string {
  return options.sections as string;
}
