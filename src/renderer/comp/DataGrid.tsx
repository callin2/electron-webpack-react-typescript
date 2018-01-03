import * as React from 'react';


// Finally we'll embed it all in an SVG
export function DataGrid(props) {

    console.log('DataGrid', props)

    return (
            
        <div>
            <table style={{border:1, borderColor:'black', backgroundColor:'white'}}>
                <thead>
                    <tr>
                        <td style={{border:'1px solid black', borderColor:'black'}}>STATION_ID</td>
                        <td style={{border:'1px solid black', borderColor:'black'}}>LAT</td>
                        <td style={{border:'1px solid black', borderColor:'black'}}>LON</td>
                        <td style={{border:'1px solid black', borderColor:'black'}}>CHARGER</td>
                        <td style={{border:'1px solid black', borderColor:'black'}}>CONN_TYPE</td>
                        <td style={{border:'1px solid black', borderColor:'black'}}>E_USAGE</td>
                    </tr>
                </thead>
                <tbody>
            {props.data.rows.map((r, idx)=>{
                return <tr key={idx}>
                    <td style={{border:'1px solid black', borderColor:'black'}}>{r.station_id}</td>
                    <td style={{border:'1px solid black', borderColor:'black'}}>{r.lat}</td>
                    <td style={{border:'1px solid black', borderColor:'black'}}>{r.lon}</td>
                    <td style={{border:'1px solid black', borderColor:'black'}}>{r.charger}</td>
                    <td style={{border:'1px solid black', borderColor:'black'}}>{r.conn_type}</td>
                    <td style={{border:'1px solid black', borderColor:'black'}}>{r.e_usage}</td>
                </tr>
            })}
                </tbody>
            </table>
        </div>
    );
}