import * as React from 'react';


// Finally we'll embed it all in an SVG
export function DataGrid(props) {

    console.log('DataGrid', props)

    return (
        <div>
            <table style={{borderWidth:1, borderColor:'black'}}>
            {props.data.rows.map((r)=>{
                return <tr>
                    <td style={{borderWidth:1, borderColor:'black'}}>{r.time}</td>
                    <td style={{borderWidth:1, borderColor:'black'}}>{r.charge_amount_at_the_time}</td>
                </tr>
            })}
            </table>
        </div>
    );
}