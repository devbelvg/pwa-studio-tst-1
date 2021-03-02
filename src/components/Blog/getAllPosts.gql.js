import { gql } from '@apollo/client';

export const GET_All_POSTS_DATA = gql`
    query getAllPostsData {
        mpBlogPosts(
            action: "get_post_list"
        ) {
            items {
                enabled
                image
                name
                short_description
                post_id
                publish_date
                url_key
            }
        }
    }
`;

export default {
    queries: {
        getAllPostsData: GET_All_POSTS_DATA
    }
};
