import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest, { RokuRequestError } from '../utils/RokuRequest';
import xml2js from 'xml2js';

export type GraphicsFrameRateOptions = {
  rokuIP?: string;
};

export default async (options?: GraphicsFrameRateOptions): Promise<void> => {
  try {
    const response = await new RokuRequest({
      method: RequestMethod.GET,
      path: 'query/graphics-frame-rate',
      port: RokuPort.ECP,
      rokuIP: options?.rokuIP || args.rokuIP,
    }).send();

    const parsedResponse = await xml2js.parseStringPromise(response.body || '', {
      explicitArray: false,
    });

    return parsedResponse['graphics-frame-rate'];
  } catch (error) {
    const rokuError = error as RokuRequestError;

    if (rokuError.body) {
      const parsedError = await xml2js.parseStringPromise(rokuError.body, {
        explicitArray: false,
      });

      if (parsedError['graphics-frame-rate'].status === 'FAILED') {
        throw new Error(parsedError['graphics-frame-rate'].error);
      }
    } else if (rokuError.statusCode !== 200) {
      throw new Error(`Unknown error. HTTP status code: ${rokuError.statusCode} \n ${rokuError.message}`);
    }
  }
};
