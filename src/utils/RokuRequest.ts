import FormData from 'form-data';
import { ReadStream, WriteStream } from 'fs-extra';
import http from 'http';
import DigestHeader from './DigestHeader';
import { RequestMethod } from './RequestMethod.enum';
import { RokuPort } from './RokuPort.enum';

type FormDataType = { [key: string]: string | ReadStream };
type HeadersType = { [key: string]: string | string[] | undefined };

export type RokuRequestOptions = {
  auth?: {
    password: string;
    user: string;
  };
  method: RequestMethod;
  path: string;
  port: RokuPort;
  rokuIP: string;
  url?: string;
};

export type RokuRequestData = {
  file?: WriteStream,
  formData?: FormDataType;
  headers?: HeadersType;
  isSendingFile?: boolean,
};

export type RokuRequestError = {
  body?: string;
  headers?: HeadersType;
  message?: string;
  statusCode?: number;
};

export type RokuRequestResponse = {
  body?: string;
  error?: object;
  headers?: HeadersType;
  statusCode?: number;
};

export default class RokuRequest {
  private numberOfRequestsMade = 0;
  private options: RokuRequestOptions;

  constructor(options: RokuRequestOptions) {
    this.options = options;
  }

  send(data: RokuRequestData = {}): Promise<RokuRequestResponse> {
    return this.sendRequest(data).catch((failedResponse) => {
      if (failedResponse.statusCode === 401 && this.numberOfRequestsMade++ === 0) {
        const authHeader = failedResponse.headers['www-authenticate'] ?? '';
        const headers = data?.headers ?? {};

        data.headers = {
          ...headers,
          Authorization: new DigestHeader({
            authHeader,
            method: this.options.method,
            password: this.options.auth?.password ?? '',
            path: this.options.path,
            user: this.options.auth?.user ?? '',
          }).get(),
        };

        return this.sendRequest(data);
      }

      throw failedResponse;
    });
  }

  private sendRequest(data: RokuRequestData): Promise<RokuRequestResponse> {
    return new Promise((resolve, reject) => {
      const options: http.RequestOptions = {
        headers: data.headers ?? {},
        hostname: this.options.rokuIP,
        method: this.options.method,
        path: this.options.path,
        port: this.options.port,
      };

      if (data?.formData && options.headers) {
        options.headers['content-type'] = 'multipart/form-data';
      }

      const request = http.request(options, (response) => {
        if (data.file && response.statusCode === 200) {
          response.pipe(data.file);

          return;
        }

        let responseBody = '';

        response.setEncoding('utf8');
        response.on('data', (chunk) => (responseBody += chunk));
        response.on('end', () => {
          const responseData = {
            body: responseBody,
            headers: response.headers,
            statusCode: response.statusCode,
          };

          if (!response.statusCode || response.statusCode > 399) {
            reject(responseData);

            return;
          }

          resolve(responseData);
        });
      });

      request.on('error', (error) => reject({
        error,
        statusCode: -1,
      }));

      if (this.options.method === RequestMethod.POST && data?.formData && this.numberOfRequestsMade > 0) {
        const formData = this.toFormData(data?.formData ?? {});

        formData.getLength((error, length) => {
          if (!error) {
            request.setHeader('content-length', length);
          }

          const formHeaders = formData.getHeaders();

          for (const formHeaderKey in formHeaders) {
            request.setHeader(formHeaderKey, formHeaders[formHeaderKey]);
          }

          formData.pipe(request);

          if (!data.isSendingFile) {
            request.end();
          }
        });

        return;
      }

      request.end();
    });
  }

  private toFormData(data: { [key: string]: string | ReadStream }): FormData {
    const formData = new FormData();

    for (const dataKey in data) {
      formData.append(dataKey, data[dataKey]);
    }

    return formData;
  }
}
