import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Header from './Header';

import { baseURL } from '../config/axios.defaults';


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

        axios.get(baseURL + '/cards', {
            headers: {
                id: this.props.id,
                authorization: this.props.auth.token
            }
        })
        .then(response => {
            console.log('get cards response', response);
            const cards = response.data;

            this.setState({
                cards
            });
        })
        .catch(
            error => {
                console.log('get cards error', error);
            }
        );
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

                <div className='study-container'>
                    <h2 className='study-title'>Title</h2>
                    

                    {
                        this.state.studying ?

                        <div>
                            {
                                this.state.studyComplete ?

                                <div>
                                    <h2>finished</h2>

                                    {this.state.results.map((item, index) => {

                                        console.log('item results', item);
                                        let score;

                                        if (item.score === -1) {
                                            score = 'bad'; 
                                        } else if (item.score === 0) {
                                            score = 'good';
                                        } else {
                                            score = 'excellent';
                                        }

                                        return (
                                            <li key={item.id}>{this.state.cards[item.id].front} [{this.state.cards[item.id].back}] : {score}</li>
                                        );
                                    })}
                                
                                
                                </div>
                                :

                                <div>
                                    <div className='study-count'>{this.state.count +1} / {this.state.cards.length}</div>
                                    <h2 className='study-value'>{this.state.cards[this.state.sequence[this.state.count]].front}</h2>
                                    {
                                        this.state.showAnswer ? 

                                        <div>
                                            <h3 className='study-back'>{this.state.cards[this.state.sequence[this.state.count]].back}</h3>
                                                        
                                            <div className="study-button-group">
                                                <button className='btn study-button study-button-hard' onClick={() => this.handleOption(-1)}>Hard</button>
                                                <button className='btn study-button study-button-good' onClick={() => this.handleOption(0)}>Good</button>
                                                <button className='btn study-button study-button-easy' onClick={() => this.handleOption(1)}>Easy</button>
                                            </div>
                                        </div>

                                        : 

                                        <div className='study-button-group'>
                                            <button className='btn study-button study-button-show-answer' onClick={this.handleShowAnswer}>Show Answer</button>
                                        </div>
                                    }
                                </div>
                            }
                            <button className='btn study-button study-button-exit' onClick={this.handleExit}>Exit</button>
                        </div>

                        : 

                        <div>
                            <div className='study-total'>Total: <span>{this.state.cards.length}</span></div>
                            <button className="btn study-button study-button-study-now" onClick={this.handleStudyNow}>Study now</button>
                        </div>
                    }
                    
                </div>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};
export default connect(mapStateToProps)(Study);