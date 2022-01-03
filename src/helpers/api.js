export const formatLineItems = lineItems => {

    if (!lineItems || !lineItems.length) {
        return null;
    }


    return lineItems.reduce((obj, lineItem) => {
        const objKey = returnLineItemKey(lineItem.properties, lineItem.id);

        return {
            ...obj,
            [objKey]: obj[objKey] ? [
                ...obj[objKey],
                lineItem
            ] : [lineItem]
        }

    }, {})

}

export const formatLineItem = (lineItemArray) => {

        const lineItemArrayHasMoreThanOne = lineItemArray.length > 1;

        return lineItemArray.reduce((obj, lineItem, i) => {

            let title = lineItem.title;

            let subheading = lineItem.variant_title ? lineItem.variant_title : lineItem.title;
            let itemSubheading = lineItem.quantity + 'x ' + subheading;

            if (lineItem.sku.slice(0, 3) === 'POW') {
                title = lineItem.title.slice(0, 11);
                itemSubheading = lineItem.quantity + 'x ' + lineItem.title.slice(11);
            }

            subheading = lineItemArrayHasMoreThanOne && i > 0 ? obj.subheading + ', ' + itemSubheading : itemSubheading;

            let lineItemInfo = lineItemArrayHasMoreThanOne ? [
                ...obj.lineItemInfo,
                {...lineItem}
            ] : [{...lineItem}]

            return {
                ...obj,
                title,
                subheading,
                image: lineItem.image,
                currency_code: lineItem.price_set.shop_money.currency_code,
                price: obj.price += parseInt(lineItem.price),
                discount: obj.discount += parseInt(lineItem.total_discount),
                lineItemInfo,
            }
        }, { title: '', subheading: '', discount: 0, price: 0, lineItemInfo: [] })
}


const returnLineItemKey = (properties, id) => {
    const keyArray = properties.filter(property => property.name === '_key').map(property => property.value)
    return keyArray[0] ?? id;
}