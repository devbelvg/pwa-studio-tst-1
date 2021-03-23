import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

export const useProductBrandId = props => {
    const { queries, product_sku } = props;
    const { getProductBrandIdQuery } = queries;

    const { data } = useQuery(getProductBrandIdQuery, {
        variables: { product_sku },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const ProductBrandId = useMemo(()=>{
        return data.productDetail.items[0].manufacturer;
    }, [data]);
    
    return {
        ProductBrandId
    };
}