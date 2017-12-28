/**
 * 2D or 3D point
 */
import {EventEmitter} from "../EventEmitter";

export interface Point {
  x: number;
  y: number;
  z?: number;
}

// dataProvider 가 fire 할때 전갈하는 데이타
export interface VertexData {
  id: string | number
  labels? : string[]    // vlabel
  props?  : any
  vizProps?: any
  // [key:string]: any
  // parent? : string | number
}

export interface EdgeData {
  source: string | number
  target: string | number
  id?: string | number
  labels  : string[]              // elabel
  props?  : any
  [key:string]: any
}

/**
 *
 */
export interface Vertex {
  group?: string
  data: VertexData
  position?: Point
  classes?: string
}

export interface Edge {
  group?: string
  data: EdgeData
  classes?: string
}

export type CyGraphElem = Vertex | Edge
export type GraphElem = VertexData | EdgeData

export interface GraphData {
  meta?  : GraphData
  nodes : VertexData[]
  edges : EdgeData[]
  props? : any
}

export interface MapRow {[key:string]: any }
export type ArrayRow = any[]
export type RowData = MapRow | ArrayRow

export interface TabularData {
  meta?: {colanmes:TabularData, coltypes:TabularData}
  rows: RowData[]
}

export abstract class GraphDataProvider extends EventEmitter{
  constructor() {
    super();
    // 'begin' data가 load 되기 직전에 발생하는 에벤트
    // 'vertex' vertext data 가 로드될때 발생하는 이벤트
    // 'edge' edge data 가 로드될때 발생하는 이벤트
    // 'end' data가 모두 로드된 후 발생하는 이벤트
    this.addSupportEvent(['vertex', 'edge','end','begin','error','table']);
  }

  protected config: any;
  abstract async configure(config:any): Promise<any>;
}

export abstract class StaticGraphDataProvider extends GraphDataProvider {
  abstract load();
}

export abstract class DynamicGraphDataProvider extends GraphDataProvider {
  readonly : boolean;
  abstract async connect(): Promise<DynamicGraphDataProvider>;
  abstract close();
  abstract query(qry: string, param?: any);
  abstract queryPromise(query: string, param?: any): Promise<any>;
  abstract update(q: string, p: any);
  abstract expand(vertexId: string): string;
  abstract getMeta(): Promise<GraphData>;
  abstract keysByLabelNType(label: string, type: 'vertex' | 'edge'): Promise<GraphData>;



}

export class BufferedGraphDataProvider extends GraphDataProvider {
  provider: GraphDataProvider;
  vertexBuff: Vertex[] = [];
  vertexBuffSize: number;
  edgeBuff: Edge[] = [];
  edgeBuffSize: number;

  configure(config: {provider:GraphDataProvider, bufferSize? : number | {vertex:number, edge:number}}): Promise<any> {
    this.provider = config.provider;

    this.provider.on('begin',()=>{
      this.vertexBuff = [];
      this.edgeBuff = [];
      this.fire('begin')
    });
    this.provider.on('vertex', this.onVertex, this);
    this.provider.on('edge', this.onEdge, this);
    this.provider.on('end', ()=>{
      if(this.vertexBuff.length > 0) {
        this.fire('vertex', this.vertexBuff)
      }
      if(this.edgeBuff.length > 0) {
        this.fire('edge', this.edgeBuff)
      }
      this.fire('end')
    });

    if(config.bufferSize) {
      if(typeof config.bufferSize == 'number') {
        this.vertexBuffSize = config.bufferSize;
        this.edgeBuffSize = config.bufferSize;
      }else if(typeof config.bufferSize == 'object') {
        this.vertexBuffSize = config.bufferSize.vertex;
        this.edgeBuffSize = config.bufferSize.edge;
      }
    }

    return Promise.resolve(true);
  }

  onVertex(v) {
    this.vertexBuff.push(v)
    if(this.vertexBuff.length >= this.vertexBuffSize) {
      this.fire('vertex', this.vertexBuff)
      this.vertexBuff = []
    }
  }

  onEdge(e) {
    this.edgeBuff.push(e)
    if(this.edgeBuff.length >= this.edgeBuffSize) {
      this.fire('edge', this.vertexBuff)
      this.edgeBuff = []
    }
  }

  load() {
    if(this.provider instanceof StaticGraphDataProvider) {
      this.provider.load()
    }
  }

  close() {
    if(this.provider instanceof DynamicGraphDataProvider) {
      this.provider.close()
    }
  }
  query(q: string, p: any) {
    if(this.provider instanceof DynamicGraphDataProvider) {
      this.provider.query(q,p)
    }
  }
}




