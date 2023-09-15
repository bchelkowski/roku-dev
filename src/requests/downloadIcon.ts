import { WriteStream } from 'fs-extra';
import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest, { RokuRequestError } from '../utils/RokuRequest';

export type DownloadIconOptions = {
  channelId: string;
  file: WriteStream;
  rokuIP?: string;
};

export default async (options: DownloadIconOptions): Promise<void> => {
  try {
    await new RokuRequest({
      method: RequestMethod.GET,
      path: `/query/icon/${options.channelId}`,
      port: RokuPort.ECP,
      rokuIP: options.rokuIP || args.rokuIP,
    }).send({ file: options.file });
  } catch (error) {
    const rokuError = error as RokuRequestError;

    if (rokuError.statusCode === 404) {
      throw new Error('Didn\'t found channel of given channelId.');
    } else if (rokuError.statusCode !== 200) {
      throw new Error(`Unknown error. HTTP status code: ${rokuError.statusCode} \n ${rokuError.message}`);
    }
  }
};
