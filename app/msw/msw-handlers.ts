import {graphql, rest} from 'msw'

export const handlers = [
  rest.get("https://my-mock-api.com", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({message: "from msw"}));
  }),
  graphql.query(`SlugCollection`, (_, res, ctx) => {
    // note that we have to match the shape of the request
    return res(ctx.data({slugCollection: {items: [{name: 'mock'}]}}))
  }),
]
