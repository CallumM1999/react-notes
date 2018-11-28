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
                    <div className="dashboard-control">
                        <Link 
                            className="dashboard-control-button dashboard-control-button-edit"
                            to={'/edit/' + this.props._id}
                        >
                            edit
                        </Link>
                        <div 
                            className="dashboard-control-button dashboard-control-button-rename"
                            onClick={() => this.props.openModal('modalRenameDeck', { _id: this.props._id, name: this.props.name })}
                        >
                            rename
                        </div>
                        <div 
                            className="dashboard-control-button dashboard-control-button-delete"
                            onClick={() => this.props.openModal('modalDeleteDeck', { _id: this.props._id })}
                        >
                            delete
                        </div>
                        <div 
                            className="dashboard-control-button dashboard-control-button-close"
                            onClick={this.closeOptions}
                        >
                            x
                        </div>
                    </div>
                </li>
            );
        } else {
            return (
                <li className='dashboard-item'>
                    <Link className="dashboard-label" to={`/study/${this.props._id}`}>{this.props.name}</Link> 
                    <div className="dashboard-actions" onClick={this.openOptions}>Actions</div>
                </li>
            );
        }
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withRouter(connect(mapStateToProps)(DashboardItem));