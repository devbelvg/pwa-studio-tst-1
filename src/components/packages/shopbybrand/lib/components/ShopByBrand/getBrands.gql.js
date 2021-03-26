import { gql } from '@apollo/client';  

export const GET_ALL_BRANDS = gql`
    query getAllBrandsData {
        customAttributeMetadata (
            attributes: [
                {
                    attribute_code: "manufacturer"
                    entity_type: "catalog_product"
                }
            ]
        ) {
            items {
                attribute_code
                attribute_options {
                    value
                    label
                }
            }
        }        
    }
`;

export default {
    queries: {
        getAllBrandsQuery: GET_ALL_BRANDS
    }
};