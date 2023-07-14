import type {LoaderArgs} from "@remix-run/node";
import {fetch} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {prefix} from "~/msw/msw-handlers";

export async function loader({ context, params, request }: LoaderArgs) {
  const result = await fetch("https://my-mock-api.com")
  return result
}


export default function Index() {
  const result = useLoaderData<typeof loader>()
  console.log(result)
  console.log({prefix})

  return (
    <div>
      <h1>Welcome to Remix</h1>
    </div>
  );
}
