import { gql } from '@apollo/client';

const PostFragment = gql`
    fragment PostFragment on Post {
        post_id
        name
        image
		post_content
        url_key
        publish_date
    }
`

export const GET_POST_DATA = gql`
    query getPostData($url_key: String!) {
        mpBlogPosts(
            action : "get_post_list"
            filter: {
                url_key : {
                    eq : $url_key
                }
            }
        ) {
            items {
                ...PostFragment
            }
        }
    }
    ${PostFragment}
`

export default {
    queries: {
        getPostDataQuery: GET_POST_DATA
    }
};
