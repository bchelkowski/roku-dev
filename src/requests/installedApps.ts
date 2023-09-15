import xml2js from 'xml2js';
import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest from '../utils/RokuRequest';

export type App = {
  id: string;
  type: string;
  version: string;
}

export type Apps = {
  [appName: string]: App;
}

export type InstalledAppsOptions = {
  rokuIP?: string;
};

export default async (options?: InstalledAppsOptions): Promise<Apps> => {
  const apps: Apps = {};
  const response = await new RokuRequest({
    method: RequestMethod.GET,
    path: '/query/apps',
    port: RokuPort.ECP,
    rokuIP: args.rokuIP || options?.rokuIP,
  }).send();
  const parsedResponse = await xml2js.parseStringPromise(response.body || '', {
    explicitArray: false,
  });

  parsedResponse.apps.app.forEach(({ _, $ }: { _: string, $: App }) => {
    apps[_] = $;
  });

  return apps;
};
