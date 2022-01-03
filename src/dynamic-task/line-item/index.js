import React from 'react';
import './line-item.css'
import {formatCurrency} from "../../helpers/location";
import {formatLineItem} from "../../helpers/api";

const LineItem = props => {

    const { lineItem } = props;

    const formattedLineItem = formatLineItem(lineItem);

    return (
        <div className="column is-6" key={formattedLineItem.title}>
            <div className="media">
                <div className="media-left">
                    <img
                        alt={formattedLineItem.title}
                        className="image line-item__image"
                        src={formattedLineItem.image}
                    />
                </div>
                <div className="media-content">
                    <div>
                        <p className="product-title">
                            {formattedLineItem.title}
                        </p>
                        <p className="product-variants">
                            {formattedLineItem.subheading}
                        </p>
                    </div>
                </div>
                <div className="media-right">
                    <p className="product-price">{formatCurrency(formattedLineItem.price - formattedLineItem.discount, formattedLineItem.currency_code)}</p>
                </div>
            </div>
        </div>
    );
};

export { LineItem };
