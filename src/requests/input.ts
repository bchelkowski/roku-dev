import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest from '../utils/RokuRequest';

export type InputType = { [key: string]: string };

export type InputOptions = {
  input: InputType;
  rokuIP?: string;
};

export default (options: InputOptions) => {
  const inputEntries = Object.entries(options.input);
  const query = inputEntries.map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
  const path = `/input?${query}`;

  return new RokuRequest({
    method: RequestMethod.POST,
    path,
    port: RokuPort.ECP,
    rokuIP: options.rokuIP || args.rokuIP,
  }).send();
}
