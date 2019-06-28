import React, { Component } from 'react'
import LanguageContext from '../../contexts/LanguageContext'
import LanguageApiService from '../../services/language-api-service';
import { Textarea, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import { CSSTransition } from 'react-transition-group';
import './styles.css';
class LearningRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {
        value: '',
        displayguess: true,
        isCorrect: null,
        dummy: false,
        dummy2: false
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

        this.setState({
          dummy: true
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
      this.setState({
        dummy2: true
       });

  }

  render() {
    const { language, words = [] } = this.context;
    return (
      <section className="container mx-auto mt-8 mx-auto w-5/6 sm:w-3/4 md:w-1/2 xl:w-1/3">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col">


      <h2 className="text-center bg-blue-400 text-3xl text-white font-bold py-2 px-4 rounded px-4 py-2 m-2 border border-gray-500">{language.name}</h2>
      <h2 className="text-center bg-gray-200 rounded px-4 py-2 m-2 border border-gray-300">Total Correct Answers: {language.total_score}</h2>

        <div className="container mx-auto ">

      {this.state.displayguess === true && 
      <div>
    <CSSTransition in={this.state.dummy2} timeout={800} classNames="my-node">
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
                <div className="text-center mt-6">
                  <Button  type='submit' className="inline-block text-center bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Submit Your Answer
                  </Button>
                </div>
              </form>
              </div>
            </CSSTransition>
          </div>
      }


      {this.state.displayguess === false && this.state.isCorrect === true &&

        <div className="">
          <CSSTransition in={this.state.dummy} timeout={1000} classNames="my-node">
          <div>
              <div className="text-center bg-green-400 text-3xl text-white font-bold mt-12 rounded px-4 py-2 m-2">
              Correct!
              </div>

              <div className="text-center bg-grey-400 text-1xl font-bold rounded px-4 py-2 border border-gray-500 m-2">
              {this.state.answer}
              </div>
              <div className="text-center mt-6">
              <Button onClick={this.handleResetGuess} className="w-auto text-center bg-blue-500 text-white font-bold rounded px-4 py-2 m-2 focus:outline-none focus:shadow-outline">
                  Next Word
              </Button>
              </div>
            </div>
          </CSSTransition>
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
