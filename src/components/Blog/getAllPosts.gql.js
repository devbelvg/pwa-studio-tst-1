import { gql } from '@apollo/client';

const PostFragment = gql`
    fragment PostFragment on Post {
        post_id
        name
        short_description
        image
        url_key
        publish_date
    }
`

export const GET_All_POSTS_DATA = gql`
    query getAllPostsData {
        mpBlogPosts(
            action: "get_post_list"
            filter: {
                enabled : {
                    like : "1"
                }
            }
        ) {
            items {
                enabled
                ...PostFragment
            }
        }
    }
    ${PostFragment}
`

export default {
    queries: {
        getAllPostsData: GET_All_POSTS_DATA
    }
};
