import React, { Component } from 'react'
import LanguageContext from '../../contexts/LanguageContext'
import LanguageApiService from '../../services/language-api-service';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom'

class DashboardRoute extends Component {
  static contextType = LanguageContext;

  componentDidMount() {
    LanguageApiService.getAllWords()
      .then(res => {
        const { language, words } = res;
        this.context.setDashboard(language, words)
      })
  }

  render() {
    const { language, words = [] } = this.context;
    return (
      <section>
        <div >
          <h2>{language.name}</h2>
          <h2 >Total Correct Answers: {language.totalScore}</h2>
          </div>
        <h3>Words to learn</h3>
        <div>
        <ul>
          {words.map((word, index) => (
            <li key={index}>
              <h4>{word}</h4>
              <p>correct answer count: {word.wordCorrectCount}</p>
              <p>incorrect answer count: {word.wordIncorrectCount}</p>
            </li>
          ))}
        </ul>
        </div>
        <Link to='/learn'>
          <Button>Start Learning!</Button>
        </Link>
      </section>
    );
  }
}

export default DashboardRoute
