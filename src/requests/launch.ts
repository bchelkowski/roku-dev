import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest from '../utils/RokuRequest';

export type MediaType = 'episode' | 'live' | 'movie' | 'season' | 'series' | 'short-form' | 'special';

export type LaunchOptions = {
  channelId: string;
  contentId?: string;
  mediaType?: MediaType;
  rokuIP?: string;
};

export default (options: LaunchOptions) => {
  let path = `/launch/${options.channelId}`;

  if (options.contentId) {
    path += `?contentId=${encodeURIComponent(options.contentId)}`;
  }

  if (options.mediaType) {
    path += `&MediaType=${encodeURIComponent(options.mediaType)}`;
  }

  return new RokuRequest({
    method: RequestMethod.POST,
    path,
    port: RokuPort.ECP,
    rokuIP: options.rokuIP || args.rokuIP,
  }).send();
}
