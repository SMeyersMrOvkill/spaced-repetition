import React from 'react';

const LanguageContext = React.createContext({
    language: {},
    words: [],
    fetchLanguage: () => {}
});

export default LanguageContext;