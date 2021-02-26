import React from 'react';
import ReactCountryFlag from "react-country-flag";

class StoreFlag extends React.Component {

    render() {

        let storeLocale = this.props.locale,
            storeLocaleArr = storeLocale.split('_'),
            getStoreFlag = (storeLocaleArr[0] === 'en') ? storeLocaleArr[1] : storeLocaleArr[0];

        return (
            <ReactCountryFlag countryCode={getStoreFlag} />
        );
    }
}

export default StoreFlag;

