import type { LoaderArgs } from "@remix-run/node";
import { fetch} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {CDA_TOKEN, CONTENTFUL_GRAPHQL_ENDPOINT, prefix } from "~/msw/msw-handlers";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useEffect } from "react";

const query = gql`
    query {
        slugCollection {
            items {
                name
            }
        }
    }
`

const queryStr ="query{slugCollection{items{name}}}"
let uri = `${ CONTENTFUL_GRAPHQL_ENDPOINT }/`;

const client = new ApolloClient({
  uri: uri,
  ssrMode: true,
  cache: new InMemoryCache(),headers:{'Authorization': `Bearer ${CDA_TOKEN}`}
});

export async function loader({ context, params, request }: LoaderArgs) {
  // const restResult = await fetch("https://my-mock-api.com")
  const restResult = 'not yet'
  // const str = await client.query({ query })
  // const parsed = await str.data.json()
  return json({ restResult, str: '' })
}

export default function Index() {
  const result = useLoaderData<typeof loader>()
  console.log(result)

  useEffect(() => {
    console.log('making query on client?', uri)
    client.query({ query })
      .then(result => {
        console.log(result)
      })
  }, [])
  return (
    <div>
      <h1>Welcome to Remix</h1>
    </div>
  );
}
