export const formatCurrency = (amount: number, currency = 'NGN') => {
  return new Intl.NumberFormat('en-NG', {
    style: 'decimal',
    currency,
  }).format(amount);
};

    export const formatAmountUi = (value: string) => {
        if (!value) return '0'

        const number = Number(value)

        if (isNaN(number)) return value

        return number.toLocaleString('en-NG')
    }