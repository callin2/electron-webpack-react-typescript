import * as React from 'react';


// Finally we'll embed it all in an SVG
export default function NumberChart(props) {

    console.log('DataGrid', props)

    return (

        <div>
            <h1>{props.data}</h1>
            <p>{props.description}</p>
        </div>
    );
}


