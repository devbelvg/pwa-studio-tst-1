import gql from 'graphql-tag';
 
const GET_SHORT_DESCRIPTION_QUERY = gql`
    query shortDescriptionOfProduct($productSku: String!) {
        productDetail: products(filter: { sku: { eq: $productSku } }) {
            items {
                description {
                    html
                }
            }
        }
    }
`;
 
export default {
    queries: {
        getShortDescriptionQuery: GET_SHORT_DESCRIPTION_QUERY
    },
    mutations: {}
};