import * as http from 'http';

export class HttpError extends Error {

    constructor(public statusCode: number, message: string = http.STATUS_CODES[statusCode] ?? '' ) {
        super(message);
        this.name = 'HTTP Error';
    }

}