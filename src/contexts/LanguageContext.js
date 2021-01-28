import React from 'react';

const LanguageContext = React.createContext({
    language: {},
    words: [],
    head: {},
    guessResponse: null,
    fetchLanguage: () => {},
    fetchHead: () => {},
    guessWord: () => {}
});

export default LanguageContext;