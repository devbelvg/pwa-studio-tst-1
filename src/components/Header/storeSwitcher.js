import React from 'react';
import { shape, string } from 'prop-types';

import { useStoreSwitcher } from '../Peregrine/Talons/Header/useStoreSwitcher';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './storeSwitcher.css';
import SwitcherItem from './switcherItem';
import storeSwitcherOperations from './storeSwitcher.gql';
import StoreFlag from './storeFlag';

const StoreSwitcher = props => {
    const talonProps = useStoreSwitcher({
        ...storeSwitcherOperations
    });

    const {
        handleSwitchStore,
        currentStoreName,
        currentStoreLocale,
        availableStores,
        storeMenuRef,
        storeMenuTriggerRef,
        storeMenuIsOpen,
        handleTriggerClick
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const menuClassName = storeMenuIsOpen ? classes.menu_open : classes.menu;

    if (!availableStores || availableStores.size <= 1) return null;

    const stores = [];

    availableStores.forEach((store, code) => {
        stores.push(
            <li key={code} className={classes.menuItem}>
                <SwitcherItem
                    active={store.isCurrent}
                    onClick={handleSwitchStore}
                    option={code}
                >
                    <StoreFlag locale={store.locale} />
                </SwitcherItem>
            </li>
        );
    });

    return (
        <div className={classes.root}>
            <button
                className={classes.storebutton}
                aria-label={currentStoreName}
                onClick={handleTriggerClick}
                ref={storeMenuTriggerRef}
            >
                <span className={classes.trigger}>
                    <span><StoreFlag locale={currentStoreLocale} /></span>
                </span>
            </button>
            <div ref={storeMenuRef} className={menuClassName}>
                <ul>{stores}</ul>
            </div>
        </div>
    );
};

export default StoreSwitcher;

StoreSwitcher.propTypes = {
    classes: shape({
        root: string,
        trigger: string,
        menu: string,
        menu_open: string,
        menuItem: string
    })
};
