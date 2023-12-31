import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {query} from "~/routes/slugCollectionQuery";

const client = new ApolloClient({
  uri: process.env.CONTENTFUL_GRAPHQL_ENDPOINT,
  ssrMode: true,
  cache: new InMemoryCache(), headers: {'Authorization': `Bearer ${process.env.CDA_TOKEN}`}
});

export async function loader() {
  const restResult = await fetch("https://my-mock-api.com")
  const result = await client.query({query})
  return json({graphQl: result?.data, rest: restResult})
}

export default function Index() {
  const result = useLoaderData<typeof loader>()
  console.log(result)

  return (
    <div>
      <pre>{JSON.stringify(result.graphQl, null, 2)}</pre>
    </div>
  );
}
