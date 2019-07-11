import React, { Component } from 'react';
import Navigation from './Navigation';
import ListContainer from './list/ListContainer';
import ItemContainer from './item/ItemContainer';
import Auth from './Auth';

class Main extends Component {
    render() {
        return (
            <div className="main">
                <Navigation />
                <div className="wrapper main-wrapper">
                    {/* Main contain */}
                        {/* <ListContainer />
                        <ItemContainer /> */}
                    {/* end main */}

                    <Auth />


                </div>
            </div>
        )
    }
}

export default Main;