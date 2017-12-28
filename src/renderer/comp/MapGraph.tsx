import * as React from 'react';
import GoogleMapReact from 'google-map-react';

export default function MapGraph(props){

    console.log('MapGraph', props)

    return <GoogleMapReact
        apiKey='AIzaSyBFKy2PETbXuW2gj5FFar1c8LzGv1DqBc0'
        defaultCenter={{lat: 35.013243, lng: 126.717850}}
        defaultZoom={13}
    >
        {/*<AnyReactComponent*/}
        {/*lat={59.955413}*/}
        {/*lng={30.337844}*/}
        {/*text={'Kreyser Avrora'}*/}
        {/*/>*/}
    </GoogleMapReact>
}


