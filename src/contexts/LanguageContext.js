
import React, { Component } from 'react'

const LanguageContext = React.createContext({
  language: {},
  words: [],
  totalScore: 0,
  setDashboard: () => { },
  wordCorrectCount: 0,
  wordIncorrectCount: 0,
})
export default LanguageContext;

export class LanguageProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: {},
      words: [],
      totalScore: 0,
      wordCorrectCount: 0,
      wordIncorrectCount: 0,
    }
  }

  setDashboard = (language, words) => {
    this.setState({ language, words })
  }

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,
      totalScore: this.state.totalScore,
      setDashboard: this.setDashboard,
      wordCorrectCount: this.state.wordCorrectCount,
      wordIncorrectCount: this.state.wordIncorrectCount
    }

    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }

}