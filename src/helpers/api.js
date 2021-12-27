export const formatLineItems = lineItems => {

    const lineItemsObj = lineItems.reduce((obj, lineItem) => {
        const objKey = returnLineItemKey(lineItem.properties, lineItem.id);

        return {
            ...obj,
            [objKey]: obj[objKey] ? [
                ...obj[objKey],
                lineItem
            ] : [lineItem]
        }

    }, {})

    return Object.values(lineItemsObj).map((lineItemArray) => {

        const lineItemArrayHasMoreThanOne = lineItemArray.length > 1;

            return lineItemArray.reduce((obj, lineItem, i) => {

                let title = lineItem.title;
                let subheading = lineItem.variant_title ? lineItem.variant_title : lineItem.title;
                if (lineItem.sku.slice(0,3) === 'POW') {
                    title = lineItem.title.slice(0, 11);
                    const itemSubheading = lineItem.quantity + 'x ' + lineItem.title.slice(11);
                    subheading = lineItemArrayHasMoreThanOne && i > 0 ? obj.subheading + ', ' + itemSubheading : itemSubheading;
                }

                return {
                    ...obj,
                    title,
                    subheading,
                    image: lineItem.image,
                    currency_code: lineItem.price_set.shop_money.currency_code,
                    accumulative_price: obj.accumulative_price += parseInt(lineItem.price),
                    accumulative_discount: obj.accumulative_discount += parseInt(lineItem.total_discount)

                }
            }, { title: '', subheading: '', accumulative_discount: 0, accumulative_price: 0 })
    })

}


const returnLineItemKey = (properties, id) => {
    const keyArray = properties.filter(property => property.name === '_key').map(property => property.value)
    return keyArray[0] ?? id;
}