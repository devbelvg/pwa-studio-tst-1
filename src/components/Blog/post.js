import React from 'react';
import SimpleImage from '@magento/venia-ui/lib/components/Image';
import { Calendar as CalendarIcon } from 'react-feather';
import { Link } from 'react-router-dom';
import Icon from '@magento/venia-ui/lib/components/Icon';
import defaultClasses from './postList.css';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

const Post = (props) => {
    const { name, image, description, date, url } = props;
    const mediaUrl = process.env.MAGENTO_BACKEND_URL + 'pub/media/mageplaza/blog/post/';
    const classes = mergeClasses(defaultClasses);
    const formattedDate = (date) => {
        const postDate = date.split(' ');
        return postDate[0];
    }

    return (
        <div className={classes.postWrap}>
            <div className={classes.postItem}>
                <div className={classes.postImageWrap}>
                    <SimpleImage src={mediaUrl+image} alt={name} className={classes.postImage} displayPlaceholder={false} />
                </div>
                <div className={classes.postName}>
                    <h2>
                        <Link to={`/blog/${url}`} alt={name} className={classes.postLink} title={name} >
                            {name}
                        </Link>
                    </h2>
                </div>
                <div className={classes.postInfo}>
                    <div className={classes.postInfoItem}>
                        <span className={classes.postInfoIcon}><Icon src={CalendarIcon} size={16} /></span>
                        <span className={classes.postInfoText}>{formattedDate(date)}</span>
                    </div>
                </div>
                <div className={classes.postDescription}>
                    <p>{description}</p>
                </div>
                <div className={classes.postButton}>
                    <Link to={`/blog/${url}`} alt={name} className={classes.postLink} title={name} >
                            Read more...
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Post;