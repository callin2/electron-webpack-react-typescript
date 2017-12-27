import {GraphData, StaticGraphDataProvider} from "./GraphTypes";
import * as EventEmitter from 'events'
import * as fs from "fs";

// import * as Parser from 'jsonparse';
// import * as through from 'through';

export class JsonDataProvider extends StaticGraphDataProvider {
  filepath: string;


  /**
   * if possible do not use this method
   * @returns {Promise<GraphData>}
   */
  loadAll(): Promise<GraphData> {
    throw new Error("Method not implemented.");
  }

  /**
   * stream
   * @param {{onVertex: ((Vertex: any) => void); onEdge: ((Edge: any) => void)}} callbackObj
   */
  load() {
    let stream = fs.createReadStream("file:///home/callin/Project/agens_browser_client/src/webkit/data/treegraph.json");
    stream.pipe(Json2GraphStream.parse({
      node: {},
      edge: {}
    }));





  }

  /**
   *
   * @param {{nodeRule: any; edgeRule: any; filePath: string}} config
   * @returns {Promise<any>}
   */
  configure(config: {nodeRule:any, edgeRule:any, filePath:string}): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

class Json2GraphStream {
  static parse(option: any) {



    return null
  }
}

class JsonConverter extends EventEmitter {
  constructor(protected rule:any) {
    super()
  }




}
