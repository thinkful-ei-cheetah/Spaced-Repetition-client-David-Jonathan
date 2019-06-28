import React, { Component } from 'react'
import LanguageContext from '../../contexts/LanguageContext'
import LanguageApiService from '../../services/language-api-service';
import Button from '../../components/Button/Button';
import Language from '../../components/Dashboard/Language';
import Wordlist from '../../components/Dashboard/Wordlist';
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
    console.log(language, words);
    return (
      <section className="container mx-auto w-screen sm:w-3/4 md:w-1/2 xl:w-1/3 mt-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <Language language={language}/>
        <Wordlist words={words}/>
        <Link className="text-center mt-6" to='/learn'>
          <Button className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Start Learning!</Button>
        </Link>
        </div>
      </section>
    );
  }
}

export default DashboardRoute
