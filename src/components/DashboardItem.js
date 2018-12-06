import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class DashboardItem extends React.Component {
    constructor(props) {
        super(props);

        this.closeOptions = this.closeOptions.bind(this);
        this.openOptions = this.openOptions.bind(this);
        this.handleEscape = this.handleEscape.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            optionsOpen: false
        };  
    }

    componentWillUnmount() {
        this.closeOptions();
    }

    handleEscape(e) {
        if (e.key === 'Escape') this.closeOptions();
    }

    handleClick(e) {
        if (!this.node.contains(e.target)) this.closeOptions();
    }

    closeOptions() {
        this.setState({ optionsOpen: false });
        document.removeEventListener('keydown', this.handleEscape, false);
        document.removeEventListener('click', this.handleClick, false);
    }

    openOptions() {
        this.setState({ optionsOpen: true });
        document.addEventListener('keydown', this.handleEscape, false);
        document.addEventListener('click', this.handleClick, false);
    }

    render() {
        if (this.state.optionsOpen) {
            return (
                <li className='dashboard-item'
                    ref={node => { this.node = node; }}
                >
                    <Link 
                        className="dashboard-control-button dashboard-control-button-edit"
                        to={'/edit/' + this.props._id}
                    >
                        <i className="small material-icons grey-text text-darken-4 tooltipped" data-position='bottom' data-tooltip='Edit' name='edit'>edit</i>
                        <label htmlFor='edit'>Edit</label>
                    </Link>
                    <div 
                        className="dashboard-control-button dashboard-control-button-rename"
                        onClick={() => this.props.openModal('modalRenameDeck', { _id: this.props._id, name: this.props.name })}
                    >
                        <i className="small material-icons grey-text text-darken-4 tooltipped" data-position='bottom' data-tooltip='Rename' onClick={() => this.props.openModal('modalRenameDeck', { _id: this.props._id, name: this.props.name })}>title</i>
                        <label htmlFor='rename'>Rename</label>
                    </div>
                    <div 
                        className="dashboard-control-button dashboard-control-button-delete"
                        onClick={() => this.props.openModal('modalDeleteDeck', { _id: this.props._id })}
                    >
                        <i className="small material-icons grey-text text-darken-4 tooltipped" data-position='bottom' data-tooltip='Delete' onClick={() => this.props.openModal('modalDeleteDeck', { _id: this.props._id })}>delete</i>
                        <label htmlFor='delete'>Delete</label>
                    </div>
                    <div 
                        className="dashboard-control-button dashboard-control-button-close"
                        onClick={this.closeOptions}
                    >
                        <button className='btn waves-effect waves-light dashboard-item-actions grey darken-2' onClick={this.closeOptions}>Close</button>
                    </div>
                </li>
            );
        } else {
            return (
                <li className='dashboard-item'>
                    <Link className="dashboard-item-label" to={`/study/${this.props._id}`}>{this.props.name}</Link> 
                    <button className='btn waves-effect waves-light dashboard-item-actions grey darken-2' onClick={this.openOptions}>actions</button>
                </li>
            );
        }
    }
}

const mapStateToProps = (state) => ({ auth: state });

export default withRouter(connect(mapStateToProps)(DashboardItem));