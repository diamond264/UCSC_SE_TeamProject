import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import '../../App.css';

import {getUserDataFromID} from '../../shared/Firebase';

//
// Summarize a listing, to be viewed as a card within the Market
// or in user listing summary
//
class ListingSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postDate: null,
            dueDate: null,
            displayName: null
        }
    }

    componentWillMount = () => {
        var postDate = new Date(this.props.postDate);
        var dueDate = new Date(this.props.dueDate);
        this.setState({
            postDate,
            dueDate
        })
        this.getUserData();
    }

    async getUserData() {
        await getUserDataFromID(this.props.seller).then(user => {
            this.setState({
                displayName: user.displayName
            })
        })
    }

    render() {
        // console.log(this.props);
        return (
            <div className="card col s6 m6 market-fade z-depth-0">
                <NavLink to={'/listing/' + this.props.id} className="black-text">
                        <div className="card-content">
                            <h5>{this.props.name}</h5>
                            <p className="grey-text text-darken-1">Price: ${this.props.price}</p>
                            <p className="truncate">{this.props.description}</p>
                            <div className="section">
                                <div className="divider"></div>
                                <p className="grey-text">by {this.state.displayName} on {this.state.postDate.getMonth() + 1}/{this.state.postDate.getDate()}/{this.state.postDate.getFullYear()}</p>
                            </div>
                        </div>
                </NavLink>
            </div>
        )
    }
}

export default ListingSummary;