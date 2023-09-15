import * as dotEnv from 'dotenv';
import minimist from 'minimist';

dotEnv.config();

export const envVariables = process.env;

const argv = process.argv.slice(2);
const parsedArgs = minimist(argv, {
  default: {
    /**
     * @type {string} Archive file path that should be deployed
     * It is required for uploading a package.
     *
     * .env example:
     * APP_ARCHIVE_PATH=./path/to/app.zip
     */
    appArchivePath: process.env.APP_ARCHIVE_PATH || '',

    /**
     * @type {string} Roku Channel id.
     * It is required for any deep linking request or reqistry information
     *
     * .env example:
     * CHANNEL_ID=123
     */
    channelId: process.env.CHANNEL_ID || '',

    /**
     * @type {string} Path for icon.
     * It is required when downloading the channel's icon.
     *
     * .env example:
     * ICON_PATH=/path/to/icon.jpg
     */
    iconPath: process.env.ICON_PATH || '',

    /**
     * @type {string} Roku Developer password.
     * It is required for any GUI request.
     *
     * .env example:
     * ROKU_DEV_PASSWORD=pass
     */
    rokuDevPassword: process.env.ROKU_DEV_PASSWORD || '',

    /**
     * @type {string} Roku Developer id.
     * It is required for device rekey and for generating production package.
     *
     * .env example:
     * ROKU_DEV_ID=nkj3n4ij32n423i4jn23ij4ni23jn4
     */
    rokuDevId: process.env.ROKU_DEV_ID || '',

    /**
     * @type {string} Roku  Developer signing password.
     * It is required for device rekey and for generating production package.
     *
     * .env example:
     * ROKU_DEV_SIGNING_PASSWORD=pass
     */
    rokuDevSigningPassword: process.env.ROKU_DEV_SIGNING_PASSWORD || '',

    /**
     * @type {string} Roku IP address.
     * It is required for any direct request beside discovery one.
     *
     * .env example:
     * ROKU_IP=127.0.0.1
     */
    rokuIP: process.env.ROKU_IP || '',

    /**
     * @type {string} Screenshot file path where it will be downloaded.
     * It is required for taking a screenshot.
     *
     * .env example:
     * SCREENSHOT_PATH=./dist/screenshot.jpg
     */
    screenshotPath: process.env.SCREENSHOT_PATH || './dist/screenshot.jpg',

    /**
     * @type {string} Path for already signed package.
     * It will be used as a path for an existing signed package for rekey.
     *
     * .env example:
     * ALREADY_SIGNED_PACKAGE_PATH=/packages/signed.pkg
     */
    alreadySignedPackagePath: process.env.ALREADY_SIGNED_PACKAGE_PATH || '',

    /**
     * @type {string} Path for generated signed package.
     * It will be used as a path for a new generated signed package.
     *
     * .env example:
     * GENERATED_SIGNED_PACKAGE_PATH=/packages/signed.pkg
     */
    generatedSignedPackagePath: process.env.GENERATED_SIGNED_PACKAGE_PATH || '',

    /**
     * @type {string} Path for signed package.
     * In case of missing alreadySignedPackagePath
     * it will be taken as an existing signed package.
     *
     * In case of missing generatedSignedPackagePath
     * it will be taken as a desitination for a new signed package.
     *
     * .env example:
     * SIGNED_PACKAGE_PATH=/packages/signed.pkg
     */
    signedPackagePath: process.env.SIGNED_PACKAGE_PATH || '',
  },
});

export default parsedArgs;
