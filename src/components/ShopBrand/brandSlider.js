import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './brandSlider.css';
import { useBrands } from '../Peregrine/Talons/ShopBrand/useBrands';
import getAllBrandsQuery from './getBrands.gql';
import Slider from '../../overrides/magento_pagebuilder/Slider';
import BrandItem from './brandItem';

const BrandsSlider = () => {

    const classes = mergeClasses(defaultClasses);

    const talonProps = useBrands({
        ...getAllBrandsQuery
    });

    const {
        allBrandsData
    } = talonProps;

    const brands = [];

    allBrandsData.forEach(brand => {
        brands.push(
            <BrandItem key={brand.value} label={brand.label} />
        );
    });

    const sliderSettings = {
        showDots: true,
        infinite: false,
        showArrows: true,
        slidesToScroll: 1,
        slidesToShow: 4,
      };

    return (
        <div className={classes.root}>
            <Slider children={brands} {...sliderSettings}></Slider>
        </div>
    );

};

export default BrandsSlider;