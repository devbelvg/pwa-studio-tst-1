import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

export const useBrands = props => {
    const { queries } = props;
    const { getAllBrandsQuery } = queries;

    const { data } = useQuery(getAllBrandsQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const allBrandsData = useMemo(()=>{
        return data.customAttributeMetadata.items[0].attribute_options;
    }, [data]);
    
    return {
        allBrandsData
    };
}