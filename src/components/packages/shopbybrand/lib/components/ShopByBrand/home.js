import React from 'react';
import { useParams } from "react-router-dom";
import { Title, Meta } from '@magento/venia-ui/lib/components/Head';
import BrandContent from './BrandContent';
import { useBrands } from '../../talons/ShopByBrand/useBrands';
import getAllBrandsQuery from './getBrands.gql';


const ShopByBrand = () => {

    const talonProps = useBrands({
        ...getAllBrandsQuery
    });

    const {
        allBrandsData
    } = talonProps;

    const { brand } = useParams();

    let brandId;

    allBrandsData.map(element => {
        if ( element.label === brand ) {
            brandId = element.value;
        }
    });

    console.log(brandId)

    let title = `Shop by brand - ${brand}`;
    let description = `Shop by ${brand} brand in Venia!`;
    let titleName = brand;

    return (
        <div>
            <Title>{title}</Title>
            <Meta name="description" content={description} />
            <h1>{titleName}</h1>
            <BrandContent brandId={brandId} />
        </div>
    );

};

export default ShopByBrand;