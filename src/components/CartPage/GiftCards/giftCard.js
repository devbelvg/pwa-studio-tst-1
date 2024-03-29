import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

import { useGiftCard } from '@magento/peregrine/lib/talons/CartPage/GiftCards/useGiftCard';
import Price from '@magento/venia-ui/lib/components/Price';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './giftCard.css';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';

const GiftCard = props => {
    const { code, currentBalance, isRemovingCard, removeGiftCard } = props;

    const { removeGiftCardWithCode } = useGiftCard({
        code,
        removeGiftCard
    });

    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <Fragment>
            <div className={classes.card_info}>
                <span className={classes.code}>{code}</span>
                <span className={classes.balance}>
                    <FormattedMessage
                        id={'giftCard.balance'}
                        defaultMessage={'Balance: '}
                    />
                    <Price
                        value={currentBalance.value}
                        currencyCode={currentBalance.currency}
                    />
                </span>
            </div>
            <LinkButton
                disabled={isRemovingCard}
                onClick={removeGiftCardWithCode}
            >
                <FormattedMessage
                    id={'giftCard.remove'}
                    defaultMessage={'Remove'}
                />
            </LinkButton>
        </Fragment>
    );
};

export default GiftCard;
