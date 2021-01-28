import React, { Component } from 'react'

import LanguageContext from '../../contexts/LanguageContext';

class LearningRoute extends Component {
  static contextType = LanguageContext;

  constructor() {
    super();
    this.state = {
      learnGuessInput: {
        value: '',
        touched: false,
      },
      requestSent: false
    }
  }

  onLearnGuessInputChanged(value) {
    this.setState({learnGuessInput: {value: value, touched: true}})
  }

  submitGuess = (e) => {
    e.preventDefault();
    console.log(this.state.learnGuessInput.value);
    this.context.guessWord(this.state.learnGuessInput.value);
    this.setState({requestSent: true});
  }

  guessAnotherWord = () => {
    window.location = "/learn";
  }

  componentDidMount() {
    this.context.fetchHead();
  }
  
  render() {
    return (
      <section>
        {this.state.requestSent&&this.context.guessResponse !== null ? <>
          <p className="DisplayScore">Your total score is: {this.context.guessResponse.totalScore}</p>
          {this.context.guessResponse.isCorrect ? <>
            <h2>You were correct! :D</h2>
          </> : <>
            <h2>Good try, but not quite right :(</h2>
          </>}
          <p className="DisplayFeedback">The correct translation for {this.context.head.nextWord} was {this.context.guessResponse.answer} and you chose {this.state.learnGuessInput.value}!</p>
          <button onClick={this.guessAnotherWord}>Try another word!</button>
        </> : <>
          <h2>Translate the word:</h2>
          <span>{this.context.head.nextWord}</span>
          <p>Your total score is: {this.context.head.totalScore}</p>
          <p>You have answered this word correctly {this.context.head.wordCorrectCount} times.</p>
          <p>You have answered this word incorrectly {this.context.head.wordIncorrectCount} times.</p>
          <form>
            <label htmlFor="learn-guess-input">What's the translation for this word?</label>
            <input id="learn-guess-input" type="text" onChange={e => this.onLearnGuessInputChanged(e.target.value)} required/>
            <hr />
            <button 
              type="submit"
              disabled={!this.state.learnGuessInput.touched}
              onClick={this.submitGuess} >Submit your answer</button>
          </form>
        </>}
      </section>
    );
  }
}

export default LearningRoute
