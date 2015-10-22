'use strict'
import React from 'react';
import './hello.styl';

let Hello = React.createClass({

    displayName: 'HelloReact',

    render: function(){
        return <div className={"con"}>Hello React</div>
    }

});


export default Hello;