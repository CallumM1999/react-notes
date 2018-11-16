import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class DashboardItem extends React.Component {
    constructor(props) {
        super(props);

        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.rename = this.rename.bind(this);

        this.closeOptions = this.closeOptions.bind(this);
        this.openOptions = this.openOptions.bind(this);

        this.handleEscape = this.handleEscape.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            optionsOpen: false
        };

      
    }


    delete() {
        const decision = confirm(`Are you sure you want to delete deck: ${this.props.name}?`);
        if (decision) {
            this.closeOptions();
            this.props.deleteDeck(this.props.id);
        } else {
            this.closeOptions();
        }

    }
    rename() {
        const name = prompt(`Enter new name for ${this.props.name}: `, this.props.name);
        if (name) {
            this.props.renameDeck(this.props.id, name);
            this.closeOptions();
        } else {
            this.closeOptions();
        }

    }
    edit() {    
        this.closeOptions();
        this.props.history.push({
            pathname: '/edit/' + this.props.id,
            state: {
                deck: this.props.name
            }
        });
    }

    handleEscape(e) {
        // console.log('event', e)
        if (e.key === 'Escape') {
            this.closeOptions();
        }
    }
    handleClick(e) {
        // console.log('click', e)
        // console.log(this)
        if (this.node.contains(e.target)) {
            // console.log('inside');
            return;
        }
        // console.log('outside')
        this.closeOptions();

    }
    closeOptions() {
        this.setState({
            optionsOpen: false
        });
        
        document.removeEventListener('keydown', this.handleEscape, false);
        document.removeEventListener('click', this.handleClick, false);
    }
    openOptions() {
        this.setState({
            optionsOpen: true
        });

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
                        <div className="dashboard-control-button dashboard-control-button-edit"
                        onClick={this.edit} >edit</div>
                        <div className="dashboard-control-button dashboard-control-button-rename"
                        onClick={this.rename} >rename</div>
                        <div className="dashboard-control-button dashboard-control-button-delete"
                        onClick={this.delete} >delete</div>
                        <div className="dashboard-control-button dashboard-control-button-close"
                        onClick={this.closeOptions}>x</div>
                    </div>
                </li>
            );
        } else {
            return (
                <li className='dashboard-item'>
                    <div className="dashboard-label" onClick={() => {
                        console.log('props', this.props);
                        this.props.history.push(`/study/${this.props.id}`);
                    }}>{this.props.name}</div> 
                    <div className="dashboard-actions" onClick={this.openOptions}>Actions</div>
                </li>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default withRouter(connect(mapStateToProps)(DashboardItem));