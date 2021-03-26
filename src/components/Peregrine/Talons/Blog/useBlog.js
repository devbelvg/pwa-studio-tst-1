import { useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';

export const useBlog = props => {
    const { queries } = props;
    const { getAllPostsData } = queries;

    const { data: allPostsData } = useQuery(getAllPostsData, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    return {
        allPostsData
    };
}
