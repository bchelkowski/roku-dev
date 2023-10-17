import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest, { RokuRequestError } from '../utils/RokuRequest';
import xml2js from 'xml2js';

export type ChannelPerformanceOptions = {
  channelId?: string;
  rokuIP?: string;
};

export default async (options?: ChannelPerformanceOptions): Promise<void> => {
  let path = '/query/chanperf';

  if (options?.channelId) {
    path += `/${options.channelId}`;
  }

  try {
    const response = await new RokuRequest({
      method: RequestMethod.GET,
      path,
      port: RokuPort.ECP,
      rokuIP: options?.rokuIP || args.rokuIP,
    }).send();

    const parsedResponse = await xml2js.parseStringPromise(response.body || '', {
      explicitArray: false,
    });

    return parsedResponse.chanperf;
  } catch (error) {
    const rokuError = error as RokuRequestError;

    if (rokuError.body) {
      const parsedError = await xml2js.parseStringPromise(rokuError.body, {
        explicitArray: false,
      });

      if (parsedError.chanperf.status === 'FAILED') {
        throw new Error(parsedError.chanperf.error);
      }
    } else if (rokuError.statusCode === 404) {
      throw new Error('Didn\'t found channel of given channelId.');
    } else if (rokuError.statusCode !== 200) {
      throw new Error(`Unknown error. HTTP status code: ${rokuError.statusCode} \n ${rokuError.message}`);
    }
  }
};
