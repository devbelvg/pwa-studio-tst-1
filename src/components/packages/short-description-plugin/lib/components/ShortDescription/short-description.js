import React from 'react';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import defaultClasses from './short-description.css';
import { useQuery } from '@apollo/client';
import productOperations from './short-description.gql';
import RichText from '@magento/venia-ui/lib/components/RichText';
import {shape, string} from 'prop-types';
 
const ShortDescription = props => {
    const { productSku } = props;
    const classes = mergeClasses(defaultClasses);
    const { queries } = productOperations;
    const { getShortDescriptionQuery } = queries;
 
    const { data } = useQuery(getShortDescriptionQuery, {
        fetchPolicy: 'cache-and-network',
        variables: {
            productSku
        }
    });
 
    const { productDetail } = data;
    const shortDescription = productDetail.items[0].description.html
 
    if (shortDescription.length) {
        return (
            <div className={classes.root}>
                <div className={classes.section}>
                    <RichText content={shortDescription} />
                </div>
            </div>
        )
    }
 
    return null;
};
 
export default ShortDescription;
ShortDescription.propTypes = {
    classes: shape({
        root: string,
        section: string,
        loader: string
    }),
    productSku: string.isRequired
}