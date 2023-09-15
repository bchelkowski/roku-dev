import { ParsedOptions } from '@caporal/core';
import { MediaType } from '../../requests/launch';

export function getMediaTypeOptionDefinition(): [string, string] {
  return ['--mediaType <mediaType>', 'Deeplink content media type'];
}

export function getMediaType(options: ParsedOptions): MediaType {
  return options.mediaType as MediaType;
}
