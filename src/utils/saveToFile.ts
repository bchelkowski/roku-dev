import { WriteStream } from 'fs-extra';

export default function saveToFile(file: WriteStream) {
  return new Promise((resolve, reject) => {
    file.on('finish', resolve);
    file.on('error', reject);
  });
}
