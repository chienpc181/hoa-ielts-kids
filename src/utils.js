// Formats a given date value to 'DD/MM/YYYY' format
const formatDate = (value) => {
    const date = (value instanceof Date) ? value : value.toDate();
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

// Splits a text area input into an array of non-empty paragraphs
const splitTextAreaToParagraphs = (text) => {
    return text.split('\n').map(para => para.trim()).filter(para => para !== '');
}

// Joins an array of paragraphs into a single text area input with newline separators
const joinParagraphsToTextArea = (paraLang, lang) => {
    if (lang === 'en') {
        return paraLang.map(x => x.en).join('\n');
    }
    else if (lang === 'vi') {
        return paraLang.map(x => x.vi).join('\n');
    }

    return "";
}

const normalizeString = (text) => {
    return text
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Remove punctuation
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim() // Trim leading and trailing spaces
        .toLowerCase();
};

export { formatDate, splitTextAreaToParagraphs, joinParagraphsToTextArea, normalizeString }
