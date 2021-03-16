import React from 'react';
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import { usePost } from '../Peregrine/Talons/Blog/usePost';
import BreadCrumb from './breadcrumb';
import getPost from './getPost.gql';
import defaultClasses from './blog.css';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { useParams } from "react-router-dom";

const PostPage = () => {
    
    const { url_key } = useParams();

    const talonProps = usePost({
        ...getPost,
        url_key
    });

    const {
        PostData
    } = talonProps;

    const classes = mergeClasses(defaultClasses);

    let postInfoArr = PostData.mpBlogPosts.items[0];
        
    return (
        <div>
        <BreadCrumb items={
                [
                    {
                        label: 'Blog',
                        path: '/blog.html'
                    },
                    {
                        label: postInfoArr.name,
                    }
                ]
        }/>
             <RichContent html={postInfoArr.post_content} />
        </div>
    );

}

export default PostPage;
