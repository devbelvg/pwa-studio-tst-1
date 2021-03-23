import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './brandItem.css';
import SimpleImage from '@magento/venia-ui/lib/components/Image/simpleImage';
import { Link } from 'react-router-dom';

const BrandItem = (props) => {

    const { label }  = props;

    const brandLogo = `${process.env.MAGENTO_BACKEND_URL}pub/media/logos/${label.toLowerCase()}.png`;


    const classes = mergeClasses(defaultClasses);

    return (
        <div className={classes.root}>
            <Link to={`/shop-by-brand/${label}`} alt={label} title={label}>
                <SimpleImage src={brandLogo} alt={label} title={label} className={classes.brandLogo} />
            </Link>
        </div>
    );

};

export default BrandItem;