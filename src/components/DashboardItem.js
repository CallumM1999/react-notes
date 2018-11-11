import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class DashboardItem extends React.Component {
    constructor(props) {
        super(props);

        this.edit = this.edit.bind(this)
        this.delete = this.delete.bind(this)
        this.rename = this.rename.bind(this)
    }

    delete() {
        this.props.deleteDeck(this.props.id)
    }
    rename() {
        const name = prompt(`Enter new name for ${this.props.name}: `);
        if (name) {
            this.props.renameDeck(this.props.id, name)
        }
    }
    edit() {       
        this.props.history.push({
            pathname: '/edit/' + this.props.id,
            state: {
                deck: this.props.name
            }
        });
    }
    render() {
        return (
            <li className='dashboarditem'>

                <div className="dashboarditem-label">{this.props.name}</div> 
                
                <div className="dashboard-buttons">
                    <div className="dashboard-button dashboard-button-rename" onClick={this.rename}>Rename</div>
                    <div className="dashboard-button dashboard-button-edit" onClick={this.edit}>Edit</div>
                    <div className="dashboard-button dashboard-button-delete" onClick={this.delete}>Delete</div>
                </div>
            </li>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(DashboardItem));