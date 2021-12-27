import React from 'react';
import {formatCurrency} from "../../helpers/location";

const LineItem = props => {

    const { lineItem } = props;

    return (
        <div className="column is-6" key={lineItem.title}>
            <div className="media">
                <div className="media-left">
                    <img
                        alt={lineItem.title}
                        className="image"
                        src={lineItem.image}
                    />
                </div>
                <div className="media-content">
                    <div>
                        <p className="product-title">
                            {lineItem.title}
                        </p>
                        <p className="product-variants">
                            {lineItem.subheading}
                        </p>
                    </div>
                </div>
                <div className="media-right">
                    <p className="product-price">{formatCurrency(lineItem.accumulative_price - lineItem.accumulative_discount, lineItem.currency_code)}</p>
                </div>
            </div>
        </div>
    );
};

export { LineItem };
