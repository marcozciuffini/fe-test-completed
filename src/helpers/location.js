export const formatCurrency = (price, currencyCode) => {
    return (price).toLocaleString('en-US', {
        style: 'currency',
        currency: currencyCode,
    });
}