import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { AlertCircle as AlertCircleIcon } from 'react-feather';

import { useGiftCards } from '@magento/peregrine/lib/talons/CartPage/GiftCards/useGiftCards';
import { Price, useToasts } from '@magento/peregrine';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import Button from '@magento/venia-ui/lib/components/Button';
import Field from '@magento/venia-ui/lib/components/Field';
import Icon from '@magento/venia-ui/lib/components/Icon';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import defaultClasses from './giftCards.css';
import GiftCard from './giftCard';

import {
    GET_APPLIED_GIFT_CARDS_QUERY,
    GET_GIFT_CARD_BALANCE_QUERY,
    APPLY_GIFT_CARD_MUTATION,
    REMOVE_GIFT_CARD_MUTATION
} from './giftCardQueries';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';

const errorIcon = (
    <Icon
        src={AlertCircleIcon}
        attrs={{
            width: 18
        }}
    />
);

/**
 * GiftCards is a child component of the CartPage component.
 * This component shows a form for applying gift cards along with a list of applied
 * Gift Cards in the shopping cart.
 *
 * @param {Object} props Component props
 * @param {Function} props.setIsCartUpdating Callback function to call when adding or removing a gift card
 * @param {Object} props.classes CSS className overrides.
 * See [giftCards.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/GiftCards/giftCards.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import GiftCards from '@magento/venia-ui/lib/components/CartPage/GiftCards';
 */
const GiftCards = props => {
    const talonProps = useGiftCards({
        setIsCartUpdating: props.setIsCartUpdating,
        mutations: {
            applyCardMutation: APPLY_GIFT_CARD_MUTATION,
            removeCardMutation: REMOVE_GIFT_CARD_MUTATION
        },
        queries: {
            appliedCardsQuery: GET_APPLIED_GIFT_CARDS_QUERY,
            cardBalanceQuery: GET_GIFT_CARD_BALANCE_QUERY
        }
    });
    const {
        applyGiftCard,
        checkBalanceData,
        checkGiftCardBalance,
        errorLoadingGiftCards,
        errorRemovingCard,
        giftCardsData,
        isLoadingGiftCards,
        isApplyingCard,
        isCheckingBalance,
        isRemovingCard,
        removeGiftCard,
        setFormApi,
        shouldDisplayCardBalance,
        shouldDisplayCardError
    } = talonProps;

    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();
    useEffect(() => {
        if (errorRemovingCard) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: formatMessage({
                    id: 'giftCards.errorRemoving',
                    defaultMessage:
                        'Unable to remove gift card. Please try again.'
                }),
                dismissable: true,
                timeout: 7000
            });
        }
    }, [addToast, errorRemovingCard, formatMessage]);

    if (isLoadingGiftCards) {
        return (
            <LoadingIndicator>
                <FormattedMessage
                    id={'giftCards.loading'}
                    defaultMessage={'Loading Gift Cards...'}
                />
            </LoadingIndicator>
        );
    }

    const classes = mergeClasses(defaultClasses, props.classes);
    const cardEntryErrorMessage = shouldDisplayCardError
        ? formatMessage({
              id: 'giftCards.errorInvalid',
              defaultMessage: 'Invalid card. Please try again.'
          })
        : null;

    let appliedGiftCards = null;
    if (errorLoadingGiftCards) {
        appliedGiftCards = (
            <span className={classes.errorText}>
                <FormattedMessage
                    id={'giftCards.errorLoading'}
                    defaultMessage={
                        'There was an error loading applied gift cards. Please refresh and try again.'
                    }
                />
            </span>
        );
    }
    if (giftCardsData.length > 0) {
        const cardList = giftCardsData.map(giftCardData => {
            const { code, current_balance } = giftCardData;

            return (
                <GiftCard
                    code={code}
                    currentBalance={current_balance}
                    isRemovingCard={isRemovingCard}
                    key={code}
                    removeGiftCard={removeGiftCard}
                />
            );
        });

        appliedGiftCards = (
            <div className={classes.cards_container}>{cardList}</div>
        );
    }

    const cardBalance = shouldDisplayCardBalance && (
        <div className={classes.balance}>
            <span className={classes.price}>
                <FormattedMessage
                    id={'giftCards.balance'}
                    defaultMessage={'Balance: '}
                />
                <Price
                    value={checkBalanceData.balance.value}
                    currencyCode={checkBalanceData.balance.currency}
                />
            </span>
        </div>
    );

    const containerClass = shouldDisplayCardError
        ? classes.card_input_container_error
        : classes.card_input_container;

    const cardEntryContents = (
        <div className={classes.card}>
            <Field
                classes={{
                    root: classes.entry
                }}
                id={classes.card}
                label={formatMessage({
                    id: 'giftCards.cardNumber',
                    defaultMessage: 'Gift Card Number'
                })}
            >
                <div className={containerClass}>
                    <TextInput
                        id={classes.card}
                        disabled={isApplyingCard || isCheckingBalance}
                        field="card"
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                        message={cardEntryErrorMessage}
                        placeholder={formatMessage({
                            id: 'giftCards.cardEntry',
                            defaultMessage: 'Enter card number'
                        })}
                        validate={isRequired}
                    />
                </div>
                {cardBalance}
            </Field>
            <Field
                classes={{
                    label: classes.applyLabel
                }}
            >
                <Button
                    priority={'normal'}
                    disabled={isApplyingCard}
                    onClick={applyGiftCard}
                >
                    <FormattedMessage
                        id={'giftCards.apply'}
                        defaultMessage={'Apply'}
                    />
                </Button>
            </Field>
            <LinkButton
                className={classes.check_balance_button}
                disabled={isCheckingBalance}
                onClick={checkGiftCardBalance}
            >
                <FormattedMessage
                    id={'giftCards.checkBalance'}
                    defaultMessage={'Check balance'}
                />
            </LinkButton>
        </div>
    );

    return (
        <div className={classes.root}>
            <div className={classes.entryForm}>
                <Form getApi={setFormApi}>{cardEntryContents}</Form>
            </div>
            {appliedGiftCards}
        </div>
    );
};

export default GiftCards;
