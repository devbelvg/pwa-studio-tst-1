import React from 'react';
import { useBlog } from '../Peregrine/Talons/Blog/useBlog';
import getAllPosts from './getAllPosts.gql';
import defaultClasses from './blog.css';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Post from './post'

const Blog = () => {
    const talonProps = useBlog({
        ...getAllPosts
    });

    const {
        allPostsData
    } = talonProps;

    // filter: {
    //     store_ids : {
    //         like : "0"
    //     }
    // }

    const classes = mergeClasses(defaultClasses);

    const posts = allPostsData.mpBlogPosts.items;

    const post = [];

    posts.forEach( element => {
        post.push(
            <Post 
                key={element.post_id} 
                name={element.name} 
                image={element.image} 
                date={element.publish_date} 
                url={element.url_key} 
                description={element.short_description}
                />
        );
    });
   
    return (
        <div className={classes.root}>
            {post}
        </div>
    );

}

export default Blog;
