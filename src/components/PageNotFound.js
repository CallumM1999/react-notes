import React from 'react';

import { Link } from 'react-router-dom';

const PageNotFount = props => {

    console.log('not found props', props)
    return (
        <div>
            <h2>Sorry, page not found</h2>


            <p onClick={() => {
                props.history.goBack();
            }}>Go Back</p>

            <Link to='/'>Home page</Link>

        </div>
    )
}

export default PageNotFount;