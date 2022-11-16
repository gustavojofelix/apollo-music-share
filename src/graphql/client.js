import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: "wss://optimum-mink-14.hasura.app/v1/graphql",
    options: {
      reconnect: true,
      timeout: 30000,
      //lazy: true,
      connectionParams: {
        headers: {
          "x-hasura-admin-secret":
            "o6fVpk3dKo6ubZIsf39jT3k0AWXaQoyWWFo2pDAtdKgACyOuYqKtRuMfS6nYz66p",
        },
      },
    },
  }),
  cache: new InMemoryCache(),
});

export default client;

// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "https://optimum-mink-14.hasura.app/v1/graphql",
//   cache: new InMemoryCache(),
//   headers: {
//     "x-hasura-admin-secret":
//       "o6fVpk3dKo6ubZIsf39jT3k0AWXaQoyWWFo2pDAtdKgACyOuYqKtRuMfS6nYz66p",
//   },
// });

// export default client;
