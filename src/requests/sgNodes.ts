import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest, { RokuRequestError } from '../utils/RokuRequest';
import xml2js from 'xml2js';

export type SGNodesOptions = {
  nodeId?: string;
  rokuIP?: string;
  type: 'all' | 'find' | 'roots';
};

const TypePath = {
  all: '/query/sgnodes/all',
  find: '/query/sgnodes/nodes?node-id=',
  roots: '/query/sgnodes/roots',
};

export default async (options: SGNodesOptions) => {
  let path = TypePath[options.type];

  if (options.nodeId) {
    path += options.nodeId;
  }

  try {
    const response = await new RokuRequest({
      method: RequestMethod.GET,
      path,
      port: RokuPort.ECP,
      rokuIP: options.rokuIP || args.rokuIP,
    }).send();

    const parsedResponse = await xml2js.parseStringPromise(response.body || '', {
      explicitArray: false,
    });

    return parsedResponse.sgnodes;
  } catch (error) {
    const rokuError = error as RokuRequestError;

    if (rokuError.body) {
      const parsedError = await xml2js.parseStringPromise(rokuError.body, {
        explicitArray: false,
      });

      if (parsedError.sgnodes.status === 'FAILED') {
        throw new Error(parsedError.sgnodes.error);
      }
    } else if (rokuError.statusCode !== 200) {
      throw new Error(`Unknown error. HTTP status code: ${rokuError.statusCode}`);
    }
  }
};
