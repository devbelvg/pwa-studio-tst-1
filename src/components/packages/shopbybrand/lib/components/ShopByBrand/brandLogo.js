import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './brandLogo.css';
import { useBrands } from '../../talons/ShopByBrand/useBrands';
import getAllBrandsQuery from './getBrands.gql';
import SimpleImage from '@magento/venia-ui/lib/components/Image/simpleImage'

export const BrandLogo = (props) => {

    const { brandId } = props;

    const classes = mergeClasses(defaultClasses);

    const talonProps = useBrands({
        ...getAllBrandsQuery
    });

    const {
        allBrandsData
    } = talonProps;

    let brandLabel;

    allBrandsData.forEach(element => {
        if ( element.value == brandId) {
            brandLabel = element.label;
        } 
    });

    const brandLogoUrl = `${process.env.MAGENTO_BACKEND_URL}pub/media/logos/${brandLabel.toLowerCase()}.png`;

    return (
        <div className={classes.root}>
             <SimpleImage src={brandLogoUrl} alt={brandLabel} title={brandLabel} />
        </div>
    );

};