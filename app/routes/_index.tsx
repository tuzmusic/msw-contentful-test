import type {LoaderArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

const query = gql`
    query {
        slugCollection {
            items {
                name
            }
        }
    }
`

const client = new ApolloClient({
  uri: process.env.CONTENTFUL_GRAPHQL_ENDPOINT,
  ssrMode: true,
  cache: new InMemoryCache(), headers: {'Authorization': `Bearer ${process.env.CDA_TOKEN}`}
});

export async function loader({context, params, request}: LoaderArgs) {
  const restResult = await fetch("https://my-mock-api.com")
  const result = await client.query({query})
  return json({graphQl: result.data, rest: restResult})
}

export default function Index() {
  const result = useLoaderData<typeof loader>()
  console.log(result)
  return (
    <div>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
