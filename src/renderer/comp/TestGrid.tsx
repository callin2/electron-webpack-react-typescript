import * as React from 'react';
import * as ReactDataGrid from 'react-data-grid'

class TestGrid extends React.Component {
  private _columns:any
  private _rows:any

  constructor(props, context) {
    super(props, context);
    console.log('testgrid props',props.data.rows.length);
    this.createRows();
 /**   
    for (let i=0; i<props.data.rows.length;i++){
       this._rows.push(props.data.rows[i]);
    }
*/
    this._columns = [
      { key: 'station_id', name: 'ID' },
      { key: 'c', name: 'Title' },
      { key: 'count', name: 'Count' } ];

    this.state = null;
  }

  createRows = () => {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }

    this._rows = rows;
  };

  rowGetter = (i) => {
    return this._rows[i];
  };

  render() {
    return  (
      <div>
      <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        minHeight={500} /></div>);
  }
}

export default TestGrid;