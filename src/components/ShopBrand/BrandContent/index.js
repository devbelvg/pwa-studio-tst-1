import React from 'react';

const BrandContent = (props) => {

    const { brandId } = props;

    return (
        <h2>here'll be content for {brandId}</h2>
    );
}

export default BrandContent;