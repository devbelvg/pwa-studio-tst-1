import { gql } from '@apollo/client';  

export const GET_PRODUCT_BRAND_ID = gql`
    query getProductBrandId($product_sku: String!){
        productDetail: products(filter: { sku: { eq: $product_sku } }) {
            items {
                manufacturer
            }
        }
    }
`;    

export default {
    queries: {
        getProductBrandIdQuery: GET_PRODUCT_BRAND_ID
    }
};