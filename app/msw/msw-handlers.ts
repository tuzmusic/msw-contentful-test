import {graphql, rest} from 'msw'

const CONTENTFUL_ENVIRONMENT = "jtuzman-sandbox"

export const prefix = `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/environments/${CONTENTFUL_ENVIRONMENT}/`

// console.log(prefix)
export const handlers = [
  rest.get("https://my-mock-api.com", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({message: "from msw"}));
  }),
  graphql.query(`SlugCollection`, (_, res, ctx) => {
    console.log('********** mocked PageFlexibleLander **********')
    return res(ctx.data({slugCollection: {items: [{name: 'mock'}]}}))
  }),
]
