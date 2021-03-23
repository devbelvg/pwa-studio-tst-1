import { gql } from '@apollo/client';  

export const GET_PRODUCTS = gql`
    query getProductsData {
        products ( filter: { manufacturer: { eq: "212" } } ) {
            total_count
            items {
                name
                sku
            }
        }     
    }
`;

export default {
    queries: {
        getProductsQuery: GET_PRODUCTS
    }
};