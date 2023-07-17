import {gql} from "@apollo/client";

export const query = gql`
    query SlugCollection {
        slugCollection {
            items {
                name
            }
        }
    }
`
