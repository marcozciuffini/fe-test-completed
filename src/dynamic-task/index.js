import React, {useEffect, useState} from 'react';
import {LineItem} from "./line-item";
import {formatLineItems} from "../helpers/api";


const DynamicTask = () => {

    const [lineItems, setLineItems] = useState(null);

    useEffect(() => {
        fetch('https://frontendtest.huel.io/api/line-items')
            .then(response => response.json())
            .then(response => {
                if (response.line_items) {
                    setLineItems(formatLineItems((response.line_items)))
                }
            });
    }, [])


    return (
        <div className="order-information-expanded">
            <div className="product-list-boxes columns is-multiline">
                {lineItems && lineItems.map(lineItem => {
                    return (
                        <LineItem
                            key={lineItem.id}
                            lineItem={lineItem}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export {DynamicTask};
