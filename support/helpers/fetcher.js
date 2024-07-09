import { GraphQLClient } from 'graphql-request';

export default class Fetcher {
  constructor(mainEndpoint, userAgent) {
    this.graphqlClient = new GraphQLClient(mainEndpoint, {
      headers: {
        'user-agent': userAgent,
      },
    });
  }
}
