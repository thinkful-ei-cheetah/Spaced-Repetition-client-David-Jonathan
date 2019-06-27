import React, { Component } from 'react'
import LanguageContext from '../../contexts/LanguageContext'
import LanguageApiService from '../../services/language-api-service';
import { Textarea, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
class LearningRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {
        value: '',
        displayguess: true,
        isCorrect: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResetGuess = this.handleResetGuess.bind(this);
  }


  handleResetGuess()
  {
    this.setState({ displayguess: true })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
   
    event.preventDefault();

    LanguageApiService.postGuess({
      guess: this.state.value
    })
      .then(res => {
        this.setState({ displayguess: false, value: '' })
        const { nextWord, wordCorrectCount, wordIncorrectCount, totalScore, answer, isCorrect } = res;

        const { language, words = []  } = this.context;
        language.total_score = totalScore;
        this.context.setDashboard(language, words)

        this.setState({
          nextWord, wordCorrectCount, wordIncorrectCount, totalScore, answer, isCorrect
        });
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  static contextType = LanguageContext;

  componentDidMount() {
    LanguageApiService.getHead()
      .then(res => {
        const { nextWord, wordCorrectCount, wordIncorrectCount, totalScore } = res;
        this.setState({
          nextWord, wordCorrectCount, wordIncorrectCount, totalScore
        });
      })

      LanguageApiService.getAllWords()
      .then(res => {
        const { language, words } = res;
        this.context.setDashboard(language, words)
        //console.log(language)
      })
  }

  render() {
    const { language, words = [] } = this.context;
    return (
      <section className="container mx-auto mt-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">

      <div className="bg-gray-100 clearfix">
       <div className="float-left bg-teal-100 px-4 py-2 m-2">{language.name}</div>
       <div className="float-right bg-gray-200 px-4 py-2 m-2">Total Correct Answers: {language.total_score}</div>
       </div>

        <div className="container mx-auto w-1/2">

      {this.state.displayguess === true && 
      <div>
        <div className="bg-gray-100 clearfix mt-20">
            <div className="float-left text-gray-700  bg-gray-200 px-4 py-2 m-2">
            {this.state.nextWord}
            </div>
            <div className="float-right text-gray-700 text-center bg-green-200 px-4 py-2 m-2">
            {this.state.wordCorrectCount}
            </div>
            <div className="float-right text-gray-700 text-center bg-red-200 px-4 py-2 m-2">
            {this.state.wordIncorrectCount} 
            </div>
          </div>
          <form 
           onSubmit={this.handleSubmit}
            >    
            <Label htmlFor='learn-guess-input' className="text-center block text-grey-darker mt-8" >
                Type your answer below
            </Label>
             <input type="text" name='guess2'  />
            <textarea id='learn-guess-input'  value={this.state.value} onChange={this.handleChange} className="mt-8 w-full border border-grey-500 text-center block text-grey-darker text-sm font-bold mb-2"  />

            <Button  type='submit' className="w-full text-center bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit Your Answer
            </Button>
          </form>
          </div>
      }


      {this.state.displayguess === false && this.state.isCorrect === true &&

        <div className="bg-gray-100 clearfix mt-20">
            <div className="float-left text-gray-700  bg-gray-200 px-4 py-2 m-2">
            Correct! {this.state.answer}
            </div>
            <Button onClick={this.handleResetGuess} className="w-full text-center bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Next Word
            </Button>
        </div>
      }

      {this.state.displayguess === false && this.state.isCorrect === false &&

      <div className="bg-gray-100 clearfix mt-20">
          <div className="float-left text-gray-700  bg-gray-200 px-4 py-2 m-2">
          Sorry the correct answer is {this.state.answer}
          </div>
          <Button onClick={this.handleResetGuess} className="w-full text-center bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Next Word
            </Button>


      </div>
      }  





          </div>
        </div>
      </section>
    );
  }
}

export default LearningRoute
