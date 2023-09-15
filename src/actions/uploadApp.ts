import fs from 'fs-extra';
import deleteApp from '../requests/deleteApp';
import replaceApp from '../requests/replaceApp';

export type UploadAppOptions = {
  appArchivePath: string;
  rokuDevPassword?: string;
  rokuIP?: string;
}

export default async (options: UploadAppOptions) => {
  if (!options.appArchivePath) {
    throw new Error('Missing appArchivePath');
  }

  const archive = fs.createReadStream(options.appArchivePath);

  await deleteApp(options);
  await replaceApp({
    ...options,
    archive,
  });
}
