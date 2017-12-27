import * as React from 'react';
import HocGraph from "../hoc/HocGraph";


var query = `select a.time AS time, a.total_charge_amount AS charge_amount_at_the_time from (
    match (n:station)-[r:transaction]->(m:echarger)
    where r.ec_charge_start_time > '20171226100000'
      and r.ec_charge_start_time < '20171227115959'
    return substring(r.ec_charge_start_time,0,10) as time, sum(r.charge_amount) as total_charge_amount) a 
group by time, charge_amount_at_the_time;`


var chartLayoutConfig = [
    {chartType: 'bar', q: query, p:{}},
    {chartType: 'line', q: query, p:{}}
];






class SecondPage extends React.Component {

    render() {
        return <div>
            {chartLayoutConfig.map((conf, idx)=>{
                return <HocGraph  {...conf} key={idx}/>
            })}
        </div>
    }
}

export default SecondPage