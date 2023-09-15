import xml2js from 'xml2js';
import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest from '../utils/RokuRequest';

type BooleanString = 'true' | 'false';

type ObjectType = { [key: string]: string | ObjectType };

export type MediaPlayerType = {
  buffering: {
    current: string;
    max: string;
    target: string;
  };
  duration: string;
  error: BooleanString;
  is_live: {
    _: BooleanString;
    blocked: BooleanString;
  };
  new_stream: {
    speed: string;
  };
  plugin: {
    bandwidth: string;
    id: string;
    name: string;
  };
  position: string;
  format: {
    audio: string;
    captions: string;
    container: string;
    drm: string;
    video: string;
  };
  state: string;
  stream_segment: {
    bitrate: string;
    height: string;
    media_sequence: string;
    segment_type: string;
    time: string;
    width: string;
  };
};

const returnAttributeValues = (entry: ObjectType) => {
  let attributeValues = { ...entry };

  if (entry.$) {
    attributeValues = {
      ...attributeValues,
      ...(entry.$ as object),
    };

    delete attributeValues.$;
  }

  return attributeValues;
};

export type MediaPlayerOptions = {
  rokuIP?: string;
};

export default async (options?: MediaPlayerOptions): Promise<MediaPlayerType> => {
  const response = await new RokuRequest({
    method: RequestMethod.GET,
    path: '/query/media-player',
    port: RokuPort.ECP,
    rokuIP: args.rokuIP || options?.rokuIP,
  }).send();

  const parsedResponse = await xml2js.parseStringPromise(response.body || '', {
    explicitArray: false,
  });
  const player = returnAttributeValues(parsedResponse.player);
  const playerInfo: Partial<MediaPlayerType> = {};

  for (const entry in player) {
    const key = entry as keyof MediaPlayerType;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    playerInfo[key] = (typeof player[key] === 'object') ? returnAttributeValues(player[key] as ObjectType) : player[key];
  }

  return playerInfo as MediaPlayerType;
};
