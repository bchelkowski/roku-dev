import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest, { RokuRequestError } from '../utils/RokuRequest';
import xml2js from 'xml2js';

export type TextureMemoryOptions = {
  rokuIP?: string;
};

export default async (options?: TextureMemoryOptions) => {
  try {
    const response = await new RokuRequest({
      method: RequestMethod.GET,
      path: '/query/r2d2-bitmaps',
      port: RokuPort.ECP,
      rokuIP: options?.rokuIP || args.rokuIP,
    }).send();

    const parsedResponse = await xml2js.parseStringPromise(response.body || '', {
      explicitArray: false,
    });

    return parsedResponse['r2d2-bitmaps'];
  } catch (error) {
    const rokuError = error as RokuRequestError;

    if (rokuError.body) {
      const parsedError = await xml2js.parseStringPromise(rokuError.body, {
        explicitArray: false,
      });

      if (parsedError['r2d2-bitmaps'].status === 'FAILED') {
        throw new Error(parsedError['r2d2-bitmaps'].error);
      }
    } else if (rokuError.statusCode !== 200) {
      throw new Error(`Unknown error. HTTP status code: ${rokuError.statusCode}`);
    }
  }
};
