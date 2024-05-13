export class HttpError extends Error {
  constructor(public response: Response) {
    super(`HTTP error! status: ${response.status}`);
  }
}
