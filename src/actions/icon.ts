import fs from 'fs-extra';
import downloadIcon from '../requests/downloadIcon';
import saveToFile from '../utils/saveToFile';

export type IconOptions = {
  channelId: string;
  iconPath: string;
  rokuIP?: string;
};

export default async (options: IconOptions) => {
  if (!options.channelId) {
    throw new Error('Missing channelId');
  }

  if (!options.iconPath) {
    throw new Error('Missing iconPath');
  }

  const file = fs.createWriteStream(options.iconPath);

  downloadIcon({
    ...options,
    file,
  });
  await saveToFile(file);
}
