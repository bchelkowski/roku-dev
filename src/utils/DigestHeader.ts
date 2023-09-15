import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { RequestMethod } from './RequestMethod.enum';

export type DigestHeaderOptions = {
  authHeader: string;
  method: RequestMethod;
  password: string;
  path: string;
  user: string
};

type ArgumentsType = {
  method: string;
  password: string;
  path: string;
  user: string;
};

type AuthHeaderParamsType = {
  algorithm: string;
  nonce: string;
  opaque: string;
  qop: string;
  realm: string;
};

export default class DigestHeader {
  private AUTH_PARAM_REG_EXP = /([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;
  private DASH_REG_EXP = /-/g;
  private QOP_REG_EXP = /(^|,)\s*auth\s*($|,)/;
  private NON_QUOTED_PARAMS = ['algorithm', 'nc', 'qop'];

  private options: ArgumentsType & Partial<AuthHeaderParamsType>;

  constructor({
    authHeader,
    method,
    password,
    path,
    user,
  }: DigestHeaderOptions) {
    this.options = {
      method,
      password,
      path,
      user,
    };

    /* eslint-disable-next-line no-constant-condition */
    while (true) {
      const match = this.AUTH_PARAM_REG_EXP.exec(authHeader);

      if (!match) {
        break;
      }

      const paramKey: keyof AuthHeaderParamsType = match[1] as keyof AuthHeaderParamsType;

      this.options[paramKey] = match[2] || match[3];
    }
  }

  get() {
    const authHeader = [];
    const authParams = this.getAuthParams();

    for (const authParamKey in authParams) {
      if (authParams[authParamKey]) {
        let param = `${authParamKey}="${authParams[authParamKey]}"`;

        if (this.NON_QUOTED_PARAMS.includes(authParamKey)) {
          param = `${authParamKey}=${authParams[authParamKey]}`;
        }

        authHeader.push(param);
      }
    }

    return `Digest ${authHeader.join(', ')}`;
  }

  private getAuthParams(): { [key: string]: boolean | string | undefined } {
    const qop = this.QOP_REG_EXP.test(this.options.qop ?? '') && 'auth';
    const cnonce = qop && uuidv4().replace(this.DASH_REG_EXP, '');
    const header1 = this.md5(`${this.options.user}:${this.options.realm}:${this.options.password}`);
    const header2 = this.md5(`${this.options.method}:${this.options.path}`);
    const nc = qop && '00000001';
    const response = qop
      ? this.md5(header1 + ':' + this.options.nonce + ':' + nc + ':' + cnonce + ':' + qop + ':' + header2)
      : this.md5(header1 + ':' + this.options.nonce + ':' + header2);

    return {
      username: this.options.user,
      realm: this.options.realm,
      nonce: this.options.nonce,
      uri: this.options.path,
      qop,
      response,
      nc,
      cnonce,
      algorithm: this.options.algorithm,
      opaque: this.options.opaque,
    };
  }

  private md5(value: string): string {
    return crypto.createHash('md5').update(value).digest('hex');
  }
}
