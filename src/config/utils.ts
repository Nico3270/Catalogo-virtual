


export const CurrencyFormat = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP", 
        minimumFractionDigits:0,
        maximumFractionDigits: 1
    }).format(value);
}