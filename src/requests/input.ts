import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest from '../utils/RokuRequest';

export type InputOptions = {
  query: string;
  rokuIP?: string;
};

export default (options: InputOptions) => {
  const path = `/input?${options.query}`;

  return new RokuRequest({
    method: RequestMethod.POST,
    path,
    port: RokuPort.ECP,
    rokuIP: options.rokuIP || args.rokuIP,
  }).send();
}
