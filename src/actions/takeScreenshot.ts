import fs from 'fs-extra';
import downloadScreenshot from '../requests/downloadScreenshot';
import makeScreenshot from '../requests/makeScreenshot';
import saveToFile from '../utils/saveToFile';

export type TakeScreenshotOptions = {
  rokuDevPassword?: string;
  rokuIP?: string;
  screenshotFilePath: string;
}

export default async (options: TakeScreenshotOptions) => {
  if (!options.screenshotFilePath) {
    throw new Error('Missing screenshotFilePath');
  }

  await fs.ensureFile(options.screenshotFilePath);

  const screenshotUriPath = await makeScreenshot(options);

  if (!screenshotUriPath) {
    throw new Error('Are you sure that you have launched dev app and screensaver in off?');
  }

  const file = fs.createWriteStream(options.screenshotFilePath);

  downloadScreenshot({
    ...options,
    file,
    screenshotUriPath,
  });
  await saveToFile(file);
}
