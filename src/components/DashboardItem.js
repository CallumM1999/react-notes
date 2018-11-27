import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class DashboardItem extends React.Component {
    constructor(props) {
        super(props);

        this.edit = this.edit.bind(this);

        this.closeOptions = this.closeOptions.bind(this);
        this.openOptions = this.openOptions.bind(this);

        this.handleEscape = this.handleEscape.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            optionsOpen: false
        };
    }
    edit() {    
        this.closeOptions();

        this.props.history.push({
            pathname: '/edit/' + this.props._id,
            state: { deck: this.props.name }
        });
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
                        <div 
                            className="dashboard-control-button dashboard-control-button-edit"
                            onClick={this.edit}
                        >
                            edit
                        </div>
                        <div 
                            className="dashboard-control-button dashboard-control-button-rename"
                            onClick={() => this.props.openModal('renameModal', { _id: this.props._id, name: this.props.name })}
                        >
                            rename
                        </div>
                        <div 
                            className="dashboard-control-button dashboard-control-button-delete"
                            onClick={() => this.props.openModal('deleteModal', { _id: this.props._id })}
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
                    <div className="dashboard-label" onClick={() => {
                        this.props.history.push({
                            pathname: `/study/${this.props._id}`,
                            state: {
                                deckName: this.props.name
                            }
                        });
                    }}>{this.props.name}</div> 
                    <div className="dashboard-actions" onClick={this.openOptions}>Actions</div>
                </li>
            );
        }
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withRouter(connect(mapStateToProps)(DashboardItem));