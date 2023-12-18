import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest, { RokuRequestError } from '../utils/RokuRequest';
import xml2js from 'xml2js';

export type BeaconsOptions = {
  channelId?: string;
  command: 'log' | 'track' | 'untrack';
  rokuIP?: string;
};

const CommandRequestMethod = {
  log: RequestMethod.GET,
  track: RequestMethod.POST,
  untrack: RequestMethod.POST,
};

const CommandPath = {
  log: '/query/fwbeacons',
  track: '/fwbeacons/track',
  untrack: '/fwbeacons/untrack',
};

export default async (options: BeaconsOptions): Promise<void> => {
  let path = CommandPath[options.command];

  if (options.command === 'track' && options.channelId) {
    path += `/${options.channelId}`;
  }

  try {
    const response = await new RokuRequest({
      method: CommandRequestMethod[options.command],
      path,
      port: RokuPort.ECP,
      rokuIP: options.rokuIP || args.rokuIP,
    }).send();

    const parsedResponse = await xml2js.parseStringPromise(response.body || '', {
      explicitArray: false,
    });

    return parsedResponse.fwbeacons;
  } catch (error) {
    const rokuError = error as RokuRequestError;

    if (rokuError.body) {
      const parsedError = await xml2js.parseStringPromise(rokuError.body, {
        explicitArray: false,
      });

      if (parsedError.fwbeacons.status === 'FAILED') {
        throw new Error(parsedError.fwbeacons.error);
      }
    } else if (rokuError.statusCode !== 200) {
      throw new Error(`Unknown error. HTTP status code: ${rokuError.statusCode} \n ${rokuError.message}`);
    }
  }
};
