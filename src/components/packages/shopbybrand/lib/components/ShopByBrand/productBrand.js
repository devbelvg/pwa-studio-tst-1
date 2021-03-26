import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './productBrand.css';
import { useProductBrandId } from '../../talons/ShopByBrand/useProductBrandId';
import getProductBrandIdQuery from './getProductBrandId.gql';
import { BrandLogo } from './brandLogo.js';

export const ProductBrand = (props) => {

    const { product_sku } = props;

    const classes = mergeClasses(defaultClasses);

    const talonProps = useProductBrandId({
        ...getProductBrandIdQuery,
        product_sku
    });

    const {
        ProductBrandId
    } = talonProps;

    let productBrandDisplay;

    if (ProductBrandId) {
        productBrandDisplay = <BrandLogo brandId={ProductBrandId} />
    } else {
        productBrandDisplay = 'No Brand for this product';
    }

    return (
        <div className={classes.root}>
            {productBrandDisplay}
        </div>
    );

};