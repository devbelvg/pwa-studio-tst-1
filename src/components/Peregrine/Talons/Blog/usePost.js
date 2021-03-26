import { useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';

export const usePost = props => {
    const { queries, url_key } = props;
    const { getPostDataQuery } = queries;
    
    const { data: PostData } = useQuery(getPostDataQuery, {
        variables: { url_key },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    return {
        PostData
    };
}