interface YelpRequestOptions {
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

export default class YelpWrapper {
  private baseUrl = 'https://api.yelp.com/v3';

  async request<T>(
    endpoint: string,
    method: string = 'GET',
    body: any = null,
    headers: Record<string, string> = {},
  ) {
    const requestUrl = `${this.baseUrl}${endpoint}`;

    const defaultHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      ...headers,
    };

    const options: YelpRequestOptions = {
      method,
      headers: defaultHeaders,
    };

    if (body) options.body = JSON.stringify(body);

    try {
      const response = await fetch(requestUrl, options);
      if (!response.ok)
        throw new Error(`Http Error! Status: ${response.status}`);
      else return (await response.json()) as T;
    } catch (error) {
      console.log('Request Failed: ', error);
      throw error;
    }
  }

  public get<T>(
    endpoint: string,
    headers: Record<string, string> = {},
  ): Promise<T> {
    return this.request<T>(endpoint, 'GET', null, headers);
  }
}
