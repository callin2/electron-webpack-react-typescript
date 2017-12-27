import {DynamicGraphDataProvider, GraphData} from "./GraphTypes";

import {v1 as neo4j} from 'neo4j-driver'
import {Driver} from "neo4j-driver/types/v1";
// import {Driver, Path, Node, Relationship} from "neo4j-driver/types/v1";


function toIdString(neo4jId: {low:number, high:number}): string {
  return '' + neo4jId;
}

export class Neo4jDataProvider extends DynamicGraphDataProvider {
  driver: Driver;
  relationBuffer: any[] = [];

  connect(): Promise<any> {
    console.log('this.config', this.config)
    this.driver = neo4j.driver(this.config.url, neo4j.auth.basic(this.config.user,this.config.password));
    return Promise.resolve("done");
  }

  close() {
    this.driver.close();
  }

  expand(vertexId: string): string {
    let q = `match p = (n)-[]-()
      where id(n) = ${vertexId}
      return p
      limit 25 `;
    this.query(q)

    return q;
  }

  query(q: string, p?: { [key: string]: any })  {
    var session = this.driver.session();
    p = p ? p : {}

    session
      .run(q,p)
      .then((result) => {
        this.fire('begin')

        result.records.forEach((record) => {
          for(let fld of record['_fields']) {
            this.processRecord(fld)
          }
        });
        session.close();

        for(let rel of this.relationBuffer) {
          this.fire('edge', rel);
        }
        this.relationBuffer = []

        this.fire('end')
      })
      .catch((error) => {
        console.error(error);
        this.fire('error', error);
        session.close();
        this.fire('end')
      });
  }



  update(q: string, p: any): Promise<any> {
    return undefined;
  }

  configure(config: any): Promise<any> {
    this.config = config;
    return undefined;
  }



  private processRecord(fld: any, graphBuff: GraphData = null) {
    if (fld['segments']) {
      this.processPath(fld, graphBuff)
    } else if (fld['start'] && fld['end']) {
      this.processRelationship(fld, graphBuff)
    } else if (fld['labels']) {
      this.processNode(fld, graphBuff)
    } else if (fld instanceof Array) {
      for (let f of fld) {
        this.processRecord(f, graphBuff);
      }
    } else if (typeof fld === 'string') {
      let vv = {
        id: fld, name: fld, props: {}
      };

      if (!graphBuff) {
        this.fire('vertex', vv);
      } else {
        graphBuff.nodes.push(vv);
      }

    }
  }

  private processPath(path: any, graphBuff: GraphData = null) {
    for (let seg of path.segments) {
      this.processNode(seg.start, graphBuff);
      this.processNode(seg.end, graphBuff);
      this.processRelationship(seg.relationship, graphBuff);
    }
  }

  private processNode(aNode: any, graphBuff: GraphData = null) {
    let param = {
      id: toIdString(aNode.identity),
      labels: aNode.labels,
      props: aNode.properties
    };

    if (!graphBuff) {
      this.fire('vertex', param);
    } else {
      graphBuff.nodes.push(param);
    }

  }

  private processRelationship(rel: any, graphBuff: GraphData = null) {
    // console.log('rel', rel)

    let items = {
      id    : 'E:' + toIdString(rel.identity),
      source: toIdString(rel.start),
      target: toIdString(rel.end),
      props : rel.properties,
      labels : [rel.type]
    };

    if (!graphBuff) {
      this.relationBuffer.push(items);
    } else {
      graphBuff.edges.push(items);
    }
  }


  getPropKeys(): Promise<string[]> {


    return null;
  }

  getMeta(): Promise<GraphData> {
    let gd: GraphData = {nodes: [], edges: []};

    return new Promise((resolve, reject) => {
      var session = this.driver.session();
      session
        .run("CALL db.schema() ")
        .then((result) => {
          result.records.forEach((record) => {
            for (let fld of record['_fields']) {
              this.processRecord(fld, gd);
            }
          });
          session.close();

          resolve(gd);
        })
        .catch((error) => {
          console.error(error);
          this.fire('error', error);
          session.close();
          reject(error);
        });
    });
  }

  keysByLabelNType(label: string, type): Promise<GraphData> {
    return undefined;
  }
}
