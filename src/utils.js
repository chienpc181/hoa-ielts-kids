const formatDate = (value) => {
    value = value.toDate();
    return value.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

export {formatDate}