import React from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';

class UserDashboard extends React.Component {
    static contextType = LanguageContext;
    
    constructor() {
        super();
    }

    componentDidMount() {
        this.context.fetchLanguage();
    }

    render() {
        return (
            <>
                <h2>Time to learn some {this.context.language.name}!</h2>
                <p>Total correct answers: {this.context.language.total_score}</p>
                <Link to="/learn">Start practicing</Link>
                <h3>Words to practice</h3>
                {this.context.words.map((word) => {
                    return <li key={word.original}>
                        <h4>{word.original}</h4>
                        <p>correct answer count: {word.correct_count}</p>
                        <p>incorrect answer count: {word.incorrect_count}</p>
                    </li>
                })}
            </>
        )
    }
}

export default UserDashboard;