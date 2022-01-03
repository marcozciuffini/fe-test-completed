import React, {useEffect, useState} from 'react';
import {LineItem} from "./line-item";
import {formatLineItems} from "../helpers/api";

const DynamicTask = () => {

    const [lineItems, setLineItems] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        fetch('https://frontendtest.huel.io/api/line-items')
            .then(response => response.json())
            .then(response => {
                if (response.line_items) {
                    setLineItems(formatLineItems(response.line_items))
                }
                setHasFetched(true);
            }).catch(() => {
                setHasFetched(true);
                setHasError(true);
        })
    }, [])

    return (
        <div className="order-information-expanded">
            <div className="product-list-boxes columns is-multiline">
                {hasFetched && lineItems && Object.keys(lineItems).map(lineItemKey => {
                    const lineItem = lineItems[lineItemKey];
                    return (
                        <LineItem
                            key={lineItemKey}
                            lineItem={lineItem}
                        />
                    )
                })}
                {hasFetched && !lineItems && <p className="column is-6">There are no items in your order</p>}
                {hasError && !lineItems && <p className="column is-6">Something went wrong. Please try again later</p>}
            </div>
        </div>
    );
};

export {DynamicTask};
