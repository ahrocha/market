import moment from "moment";

export const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

export const formatPercentage = (percentage) => {
    // if percentage can't be parsed as number, return 0,00%
    if (isNaN(percentage)) {
        return '0,00%';
    }
    if (typeof percentage === 'string') {
        percentage = parseFloat(percentage);
    }
    if (percentage < 1) {
        percentage *= 100;
    }
    return percentage.toFixed(2).replace('.', ',') + '%';
}

export const formatDateAndTime = (date) => {
    moment.locale('en-US');
    return moment(date).format('MM/DD/YYYY HH:mm a');
}
