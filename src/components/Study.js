import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Header from './Header';
import { getCard } from '../requests/cards';
import { getDecks } from '../requests/decks';

class Study extends React.Component {
    constructor(props) {
        super(props);

        this.handleStudyNow = this.handleStudyNow.bind(this);
        this.handleExit = this.handleExit.bind(this);
        this.handleShowAnswer = this.handleShowAnswer.bind(this);
        this.handleOption = this.handleOption.bind(this);

        this.state = {
            cards: [],
            count: 0,
            showAnswer: false,
            sequence: [],
            results: [],
            deckName: null,
            stage: 'loading',
            error: null
        };
    }
    componentWillMount() {
        Promise.all([getDecks(this.props.id, this.props.auth.token), getCard(this.props.id, this.props.auth.token)])
        .then(response => {
            const [decks, cards] = response;

            if (decks.status === 'error') return this.setState({ error: 'Deck not found' });
            if (cards.status === 'error') return this.setState({ error: 'Deck not found' });

            const name = decks.message.filter(item => item._id == this.props.id)[0].name;

            this.setState(() => ({
                deckName: name, 
                cards: cards.message, 
                loaded: true, 
                stage: cards.message.length > 0 ? 'start' : 'empty'
            }));

        })
        .catch(error => {
            console.log('cards error', error);
        });
    }

    handleStudyNow() {
        this.setState({
            count: 0,
            showAnswer: false,
            sequence: this.generateRandomSequence(this.state.cards.length),
            results: [],
            stage: 'study'
        });
    }

    handleExit() {
        this.setState({
            stage: 'start'
        });
    }

    handleShowAnswer() {
        this.setState({
            showAnswer: true
        });
    }

    handleOption(score) {
        this.setState(prev => ({
            stage : prev.cards.length === prev.count +1 ? 'complete' : 'study',
            showAnswer: false,
            count: prev.count +1,
            results: [
                ...prev.results,
                { id: prev.sequence[prev.count], score }
            ]
        }));
    }

    generateRandomSequence(length) {
        const array = [];
        let count = length;
        let temp, index;

        for (let i=0;i<length;i++) { array.push(i) }

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
        switch (this.state.stage) {
            case 'loading':
                return (
                    <div>
                        <Header subheading='Study' />

                        <div className="study">
                            <div className="study-head">
                                <h3 className="study-title">{this.state.deckName}</h3>
                            </div>

                            <div className="study-container">
                                {this.state.error ?
                                    <div className="study-error">Error: {this.state.error}</div>
                                :
                                    <div className="study-loading">loading...</div>
                                }
                            </div>
                        </div>
                    </div>
                );

            case 'empty': 
            return (
                <div>
                    <Header subheading='Study' />

                    <div className="study">
                        <div className="study-head">
                            <h3 className="study-title">{this.state.deckName}</h3>
                            <div className="study-count">2 / 6</div>
                        </div>

                        <div className="study-container">
                            <div className="study-empty">
                                <p>Deck contains 0 cards!</p>
                                <Link to={'/edit/' + this.props.id} className="btn waves-effect waves-light dashboard-item-actions grey darken-2">Add cards?</Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            );

            case 'start':
                return (
                    <div>
                        <Header subheading='Study' />

                        <div className="study">
                            <div className="study-head">
                                <h3 className="study-title">{this.state.deckName}</h3>
                                <div className="study-count">2 / 6</div>
                            </div>

                            <div className="study-container-flex">
                                <h3 className="study-start-total">
                                    Total: <span>{this.state.cards.length}</span>
                                </h3>
                                <div className="study-control">
                                    <div className="study-control-top">
                                        <button className="btn-large waves-effect waves-light dashboard-item-actions grey darken-2" onClick={this.handleStudyNow}>Study Now</button>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div> 
                );
            case 'study':
                return (
                    <div>
                        <Header subheading='Study' />

                        <div className="study">
                            <div className="study-head">
                                <h3 className="study-title">{this.state.deckName}</h3>
                                <div className="study-count">{this.state.count +1} / {this.state.cards.length}</div>
                            </div>
                            <div className="study-container-flex">
                                <div className='study-output'>
                                    <div className="study-output-top">
                                        <div className="study-output-top__text">
                                            {this.state.cards[this.state.sequence[this.state.count]].front}
                                        </div>
                                    </div>
                                    <div className="study-output-bottom">
                                        <div className="study-output-bottom__text">
                                            {this.state.showAnswer && this.state.cards[this.state.sequence[this.state.count]].back}
                                        </div>
                                    </div>
                                </div>
                                <div className="study-control">
                                {
                                    this.state.showAnswer ?

                                    <div className="study-control-top">
                                        <button className="btn waves-effect waves-light grey darken-2" onClick={() => this.handleOption(1)}>Easy</button>
                                        <button className="btn waves-effect waves-light grey darken-2" onClick={() => this.handleOption(0)}>Good</button>
                                        <button className="btn waves-effect waves-light grey darken-2" onClick={() => this.handleOption(-1)}>Hard</button>
                                    </div>
                                    :
                                    <div className="study-control-top">
                                        <button className="btn-large waves-effect waves-light grey darken-2" onClick={this.handleShowAnswer}>Show answer</button>
                                    </div>
                                }
                                    <div className="study-control-bottom">
                                        <button className="btn waves-effect waves-light grey darken-2" onClick={this.handleExit}>exit</button>
                                    </div>
                                </div>
                            </div>
                        </div>         
                    </div>      
                );

            case 'complete':
                return (
                    <div>
                        <Header subheading='Study' />

                        <div className="study">
                            <div className="study-head">
                                <h3 className="study-title">{this.state.deckName}</h3>
                            </div>

                            <div className="study-container-flex">
                                <div className='study-results'>
                                    <h3>Results</h3>
                                        <ul className='study-results-list'>
                                        {
                                            this.state.results.map(item => (
                                                <li className='study-results-list-item' key={item.id}>
                                                    <div>
                                                        <span>{this.state.cards[item.id].front}</span>
                                                        <span>{this.state.cards[item.id].back}</span>
                                                    </div>
                                                    <div>{item.score}</div>
                                                </li>
                                            ))
                                        } 
                                    </ul>
                                </div>
                                <div className="study-control">
                                    <div className="study-control-top">
                                        <button className="btn-large waves-effect waves-light grey darken-2" onClick={this.handleExit}>exit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                );  
        }                   
    }
}
const mapStateToProps = (state) => ({ auth: state });

export default withRouter(connect(mapStateToProps)(Study));