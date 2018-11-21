import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import { getCard } from '../requests/cards';

class Study extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studying: false,
            cards: [],
            count: 0,
            showAnswer: false,
            studyComplete: false,
            sequence: [],
            results: []
        };

        this.handleStudyNow = this.handleStudyNow.bind(this);
        this.handleExit = this.handleExit.bind(this);
        this.handleShowAnswer = this.handleShowAnswer.bind(this);
        this.handleOption = this.handleOption.bind(this);
    }
    componentWillMount() {
        console.log('mount', this.props);

        getCard(this.props.id, this.props.auth.token)
        .then(response => {
            console.log('get cards response', response);
            const cards = response.data;

            this.setState({
                cards
            });
        })
        .catch( error => console.log('get cards error', error));
    }

    handleStudyNow() {
        this.setState({
            studying: true,
            studyComplete: false,
            count: 0,
            showAnswer: false,
            sequence: this.generateRandomSequence(this.state.cards.length),
            results: []
        });
    }

    handleExit() {
        this.setState({
            studying: false
        });
    }
    handleShowAnswer() {
        this.setState({
            showAnswer: true
        });
    }


    handleOption(score) {
        this.setState(prev => ({
            studyComplete: prev.cards.length === prev.count +1,
            showAnswer: false,
            count: prev.count +1,
            results: [
                ...prev.results,
                {
                    id: prev.sequence[prev.count],
                    score
                }
            ]

        }));
    }

    generateRandomSequence(length) {
        const array = [];
        let count = length;
        let temp, index;

        for (let i=0;i<length;i++) {
            array.push(i);
        }

        // shuffle
        while (count > 0) {
            index = Math.floor(Math.random() * count);

            count--;

            temp = array[count];
            array[count] = array[index];
            array[index] = temp;
        }

        return array;
    }
    render() {

        return (
            <div>
                <Header subheading='Study' />

                <div className="study-container">
                    <div className="study-head">
                        <h3 className="study-title">{this.props.location.state.deckName}</h3>
                        {this.state.studying && !this.state.studyComplete && <div className="study-count">{this.state.count +1} / {this.state.cards.length}</div>}
                    </div>
                    
                    {
                        this.state.studying ?

                            <div className='study-output'>
                                {
                                    this.state.studyComplete ?

                                    <div>
                                        <h3 className='study-subheading'>Results</h3>
                                        <ul className='study-list'>
                                        {
                                            this.state.results.map(item => {
                                                console.log('item', item)

                                                return (
                                                    <li className='study-list-item'>
                                                        <div>
                                                            <span>{this.state.cards[item.id].front}</span>
                                                            <span>{this.state.cards[item.id].back}</span>
                                                        </div>
                                                        <div>{item.score}</div>
                                                    </li>
                                                )
                                            })

                                        }
                                        </ul>
                                    </div>

                                    :

                                    <div className='study-output-container'>
                                        <div className="study-output-top">
                                            <div className="study-output-text">
                                                {this.state.cards[this.state.sequence[this.state.count]].front}
                                            </div>
                                        </div>
                                        <hr className="study-rule" />
                                        <div className="study-output-bottom">
                                            <div className="study-output-text">
                                                {this.state.showAnswer && this.state.cards[this.state.sequence[this.state.count]].back}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>


                        :

                            <div className='study-output'>
                                <div className='study-total'>Total: <span>{this.state.cards.length}</span></div>
                            </div>

                    }
                    
                    <div className="study-control">
                        <div className="study-control-top">
                            {
                                this.state.studying ?

                                    <div>
                                        {
                                            !this.state.studyComplete && 

                                            <div>
                                                {
                                                    this.state.showAnswer ?

                                                    <div className='study-control-top-container'>
                                                        <button className="btn study-btn-option" onClick={() => this.handleOption(-1)}>Easy</button>
                                                        <button className="btn study-btn-option" onClick={() => this.handleOption(0)}>Good</button>
                                                        <button className="btn study-btn-option" onClick={() => this.handleOption(1)}>Hard</button>
                                                    </div>

                                                    :

                                                    <div className='study-control-top-container'>
                                                        <button className="btn study-btn-study" onClick={this.handleShowAnswer}>Show answer</button>
                                                    </div>

                                                }
                                            </div>
                                        }
 
                                    </div>

                                :

                                <div className='study-control-top-container'>
                                    <button className="btn study-btn-study" onClick={this.handleStudyNow}>Study Now</button>
                                </div>
                            }

                        </div>
                        <div className="study-control-bottom">
                            <button className="btn study-btn-exit" onClick={this.handleExit}>exit</button>
                        </div>
                    </div>
                </div>
            </div>
        );                                   
    }
}
const mapStateToProps = ({ auth }) => ({ auth });

export default withRouter(connect(mapStateToProps)(Study));