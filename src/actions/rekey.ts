import fs from 'fs-extra';
import rekeyDevice from '../requests/rekeyDevice';

export type RekeyOptions = {
  signedPackagePath: string;
  rokuDevSigningPassword: string;
  rokuDevPassword?: string;
  rokuIP?: string;
}

export default async (options: RekeyOptions) => {
  if (!options.signedPackagePath) {
    throw new Error('Missing signedPackagePath');
  }

  if (!options.rokuDevSigningPassword) {
    throw new Error('Missing rokuDevSigningPassword');
  }

  const signedPackage = fs.createReadStream(options.signedPackagePath);

  await rekeyDevice({
    ...options,
    signedPackage,
  });
}
