import fs from 'fs-extra';
import signPackage from '../requests/signPackage';
import downloadPackage from '../requests/downloadPackage';
import saveToFile from '../utils/saveToFile';

export type GeneratePackageOptions = {
  appName: string;
  rokuDevPassword?: string;
  rokuDevSigningPassword: string;
  rokuIP?: string;
  signedPackageFilePath: string;
};

export default async (options: GeneratePackageOptions) => {
  if (!options.appName) {
    throw new Error('Missing appName');
  }

  if (!options.signedPackageFilePath) {
    throw new Error('Missing signedPackageFilePath');
  }

  if (!options.rokuDevSigningPassword) {
    throw new Error('Missing rokuDevSigningPassword');
  }

  await fs.ensureFile(options.signedPackageFilePath);

  const signedPackageUriPath = await signPackage(options);

  if (!signedPackageUriPath) {
    throw new Error('Are you sure that you have correct setup?');
  }

  const file = fs.createWriteStream(options.signedPackageFilePath);

  downloadPackage({
    ...options,
    file,
    signedPackageUriPath,
  });
  await saveToFile(file);
}
