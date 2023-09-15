import xml2js from 'xml2js';
import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest from '../utils/RokuRequest';

export type DeviceInfoType = {
  udn: string;
  'serial-number': string;
  'device-id': string;
  'advertising-id': string;
  'vendor-name': string;
  'model-name': string;
  'model-number': string;
  'model-region': string;
  'is-tv': string;
  'is-stick': string;
  'mobile-has-live-tv': string;
  'ui-resolution': string;
  'supports-ethernet': string;
  'wifi-mac': string;
  'wifi-driver': string;
  'has-wifi-extender': string;
  'has-wifi-5G-support': string;
  'can-use-wifi-extender': string;
  'network-type': string;
  'network-name': string;
  'friendly-device-name': string;
  'friendly-model-name': string;
  'default-device-name': string;
  'user-device-name': string;
  'user-device-location': string;
  'build-number': string;
  'software-version': string;
  'software-build': string;
  'secure-device': string;
  language: string;
  country: string;
  locale: string;
  'time-zone-auto': string;
  'time-zone': string;
  'time-zone-name': string;
  'time-zone-tz': string;
  'time-zone-offset': string;
  'clock-format': string;
  uptime: string;
  'power-mode': string;
  'supports-suspend': string;
  'supports-find-remote': string;
  'find-remote-is-possible': string;
  'supports-audio-guide': string;
  'supports-rva': string;
  'has-hands-free-voice-remote': string;
  'developer-enabled': string;
  'keyed-developer-id': string;
  'search-enabled': string;
  'search-channels-enabled': string;
  'voice-search-enabled': string;
  'notifications-enabled': string;
  'notifications-first-use': string;
  'supports-private-listening': string;
  'headphones-connected': string;
  'supports-audio-settings': string;
  'supports-ecs-textedit': string;
  'supports-ecs-microphone': string;
  'supports-wake-on-wlan': string;
  'supports-airplay': string;
  'has-play-on-roku': string;
  'has-mobile-screensaver': string;
  'support-url': string;
  'grandcentral-version': string;
  'trc-version': string;
  'trc-channel-version': string;
  'davinci-version': string;
  'av-sync-calibration-enabled': string;
};

export type DeviceInfoOptions = {
  rokuIP?: string;
};

export default async (options?: DeviceInfoOptions): Promise<DeviceInfoType> => {
  const response = await new RokuRequest({
    method: RequestMethod.GET,
    path: '/query/device-info',
    port: RokuPort.ECP,
    rokuIP: args.rokuIP || options?.rokuIP,
  }).send();

  const parsedResponse = await xml2js.parseStringPromise(response.body || '', {
    explicitArray: false,
  });

  return parsedResponse['device-info'];
};
