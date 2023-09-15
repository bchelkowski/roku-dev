import xml2js from 'xml2js';
import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest from '../utils/RokuRequest';

export type RegistryOptions = {
  channelId: string;
  escaped?: boolean;
  keys?: string[];
  rokuIP?: string;
  sections?: string[];
};

export default async (options: RegistryOptions): Promise<{ [key: string]: string }> => {
  if (!options.channelId) throw Error('Missing channelId');

  const queryParams = [];
  let path = `/query/registry/${options.channelId}`;

  if (options?.escaped) queryParams.push('u=1');
  if (options?.keys) queryParams.push(`k=${options.keys.join('|')}`);
  if (options?.sections) queryParams.push(`s=${options.sections.join('|')}`);

  if (queryParams.length) path += `?${queryParams.join('&')}`;

  const response = await new RokuRequest({
    method: RequestMethod.GET,
    path,
    port: RokuPort.ECP,
    rokuIP: options.rokuIP || args.rokuIP,
  }).send();
  const parsedResponse = await xml2js.parseStringPromise(response.body || '', {
    explicitArray: false,
  });

  return parsedResponse['plugin-registry'];
};
