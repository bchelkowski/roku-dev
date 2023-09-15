import xml2js from 'xml2js';
import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest from '../utils/RokuRequest';

export type Apps = {
  [appName: string]: App;
}

export type App = {
  id: string;
  type: string;
  version: string;
}

export type ActiveAppOptions = {
  rokuIP?: string;
};

export default async (options?: ActiveAppOptions): Promise<Apps> => {
  const response = await new RokuRequest({
    method: RequestMethod.GET,
    path: '/query/active-app',
    port: RokuPort.ECP,
    rokuIP: args.rokuIP || options?.rokuIP,
  }).send();
  const parsedResponse = await xml2js.parseStringPromise(response.body || '', {
    explicitArray: false,
  });

  return {
    [parsedResponse['active-app'].app._]: parsedResponse['active-app'].app.$,
  };
};
