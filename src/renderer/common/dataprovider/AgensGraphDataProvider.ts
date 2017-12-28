import {DynamicGraphDataProvider, GraphData} from "./GraphTypes";
import * as ag from 'agensgraph';

function toIdString(agraphId: { id: any, oid: any }) {
    return agraphId.oid + '.' + agraphId.id;
}

export interface AGraphConf {
    host: string,
    port: string | number,
    user: string,
    password: string,
    database: string,
    graph_path: string
}

function dt2str(dataTypeId) {
    console.log('dataTypeId', dataTypeId);
    return 'unkown';
}

export class AGraphDataProvider extends DynamicGraphDataProvider {
    protected config: AGraphConf;
    protected dbclient: any;
    relationBuffer: any[] = [];
    private AgensVersion: string = "1.2";

    configure(config: AGraphConf): Promise<AGraphDataProvider> {
        this.config = config;
        return Promise.resolve(this);
    }

    connect(): Promise<DynamicGraphDataProvider> {
        this.dbclient = new ag.Client(this.config);

        return new Promise((resolve, reject) => {
            this.dbclient.connect(err => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    this.dbclient.query(`set graph_path = ${this.config.graph_path};`, [], (err, result) => {
                        if (err) {
                            reject(err);
                            this.fire('error', err);
                        }
                        resolve(this)
                    })

                    this.dbclient.query("match p = (n)-[]-() where id(n) = '3.1415' return p limit 1; ", [], (err) => {
                        if (err) {
                            console.log('', err);
                            this.AgensVersion = "1.3"
                        }
                    })
                }
            })
        })
    }

    close() {
        this.dbclient.end();
    }

    expand(vertexId: string): string {
        // console.info('ApplicationConfig.maxRows', ApplicationConfig.maxRows)

        let q = `match p = (n)-[]-()
      where id(n) = '${vertexId}'
      return p
      limit 25 `;

        if (this.AgensVersion === "1.3") {
            q = `match p = (n)-[]-()
      where to_jsonb(id(n)) = '${vertexId}'
      return p
      limit 25 `;
        }

        this.query(q)
        return q;
    }


    keysByLabelNType(label: string, type): Promise<GraphData> {
        return undefined;
    }

    queryGraph(q: string, p: any[] = []) {
        this.dbclient.query(q, p, (err, result) => {
            console.log('result', err, result);

            if (err) {
                // console.error(err)
                this.fire('error', err);
                // this.close();
                // reconnect
                // this.connect();
                return;
            }

            this.fire('begin');

            for (let row of result.rows) {
                for (let attrKey of Object.keys(row)) {
                    this.processRecord(row[attrKey]);
                }
            }

            for (let rel of this.relationBuffer) {
                this.fire('edge', rel);
            }
            this.relationBuffer = [];

            this.fire('end');
        })
    }


    queryTable(q: string, p: any[] = []) {
        console.log('queryTable')

        this.dbclient.query(q, p, (err, result) => {
            console.log('result', err, result);

            if (err) {
                return this.fire('error', err);
            }

            this.fire('begin');
            this.fire('table', {
                columns: result.fields.map((f) => {
                    return {name: f.name, type: dt2str(f.dataTypeID)};
                }),
                rows: result.rows
            });
            this.fire('end');
        })
    }

    query(q: string, p: any[] = []) {
        console.log('q', q);

        if (this.isGraphQuery(q)) {
            this.queryGraph(q, p);
        } else {
            this.queryTable(q, p);
        }
    }


    queryPromise(q: string, p: any[] = []): Promise<any> {
        if (this.isGraphQuery(q)) {
            return this.queryGraphPromise(q, p);
        } else {
            return this.queryTablePromise(q, p);
        }
    }

    queryGraphPromise(q: string, p: any[]): Promise<any> {
        return new Promise((resolve, reject)=>{
            this.dbclient.query(q, p, (err, result) => {
                console.log('result', err, result);

                if (err) {
                    reject(err)
                }

                var graphData = {nodes:[], edges:[]}

                for (let row of result.rows) {
                    for (let attrKey of Object.keys(row)) {
                        this.processRecord(row[attrKey], graphData);
                    }
                }
                resolve(graphData)
            })
        })
    }

    queryTablePromise(q: string, p: any[]): Promise<any> {
        return new Promise((resolve, reject)=>{
            this.dbclient.query(q, p, (err, result) => {
                // console.log('result', err, result);
                if (err) {
                    return reject(err)
                }

                resolve({
                    columns: result.fields.map((f) => {
                        return {name: f.name, type: dt2str(f.dataTypeID)};
                    }),
                    rows: result.rows
                });
            })
        })
    }

    re = /^[\s]*SELECT/i
    isGraphQuery(qStr) {
        return !this.re.test(qStr)
    }

    update(q: string, p: any) {
        return undefined;
    }

    private processRecord(fld: any, graphBuff: GraphData = null) {
        if (fld['edges'] && fld['vertices']) {
            this.processPath(fld, graphBuff)
        } else if (fld['eid']) {
            this.processRelationship(fld, graphBuff)
        } else if (fld['vid']) {
            this.processNode(fld, graphBuff)
        } else if (fld instanceof Array) {
            for (let f of fld) {
                this.processRecord(f, graphBuff)
            }
        } else if (typeof fld === 'string') {

        }
    }

    private processNode(aNode: any, graphBuff: GraphData = null) {
        let vert = {
            id: toIdString(aNode.vid),
            props: aNode.props,
            labels: [aNode.label]
        };

        if(graphBuff) {
            graphBuff.nodes.push(vert);
        }else {
            this.fire('vertex', vert);
        }
    }

    private processRelationship(rel: any, graphBuff: GraphData = null) {
        // console.log('processRelationship', rel);
        let r = {
            id: 'E:' + toIdString(rel.eid),
            source: toIdString(rel.svid),
            target: toIdString(rel.evid),
            labels: [rel.label],
            props: rel.props
        };
        if(graphBuff) {
            graphBuff.edges.push(r)
        }else {
            this.relationBuffer.push(r);
        }

    }

    private processPath(path: any, graphBuff: GraphData = null) {
        for (let v of path.vertices) {
            this.processNode(v, graphBuff);
        }

        for (let e of path.edges) {
            this.processRelationship(e, graphBuff);
        }
    }

    getMeta(): Promise<GraphData> {
        let gd: GraphData = {nodes: [], edges: []};

        return new Promise((resolve, reject) => {
            this.dbclient.query(`select * from pg_catalog.ag_label`, [], (err, result) => {
                let edge_query = []

                for (let row of result.rows) {
                    if (row.labkind === 'v') {
                        gd.nodes.push({
                            id: row.labname,
                            labels: [row.labname],
                            props: {name: row.labname}
                        });
                    } else {
                        edge_query.push(`match p = (a)-[e:${row.labname}]->(b) return label(a) as a, label(e) as l, label(b) as b limit 1 `)
                    }
                }

                /** label count 조회쿼리
                 * select sl.labid, sl.labname, el.labid, el.labname, tl.labid, tl.labname, tmp.cnt
                 from (
                 match (a)-[r:actor_in]->(b)
                 with graphid_labid(start(r)) as source, graphid_labid(id(r)) as edge, graphid_labid("end"(r)) as target
                 return source, edge, target, count(*) as cnt
                 ) tmp, pg_catalog.ag_label sl, pg_catalog.ag_label el, pg_catalog.ag_label tl
                 where tmp.source = el.labid and tmp.target = sl.labid and tmp.target = tl.labid
                 order by sl.labid, tl.labid asc;
                 */

                this.dbclient.query("select sum(n_live_tup) from pg_catalog.pg_stat_all_tables\n" +
                    "where schemaname = '" + this.config.graph_path + "'", [], (err, result) => {
                    // console.log('result', result);
                    // todo edge 수가 백만개 이하일때에는 더 정확한 쿼리를 사용

                    // MATCH (a)-[e:{edge label name}]->(b) WITH DISTINCT graphid_labid(start(e)) as left_v, label(e) as elabel, graphid_labid("end"(e)) as right_v
                    // RETURN (select labname from ag_label where labid = left_v) as left, elabel, (select labname from ag_label where labid = right_v) as right;

                });

                this.dbclient.query(edge_query.join(' union '), [], (err, result) => {
                    result.rows.forEach((r, idx) => {
                        // console.log(r)
                        gd.edges.push({
                            id: 'E:' + r.l,
                            source: r.a,
                            target: r.b,
                            labels: [r.l]
                        });
                    });

                    resolve(gd);
                });
            });
        });
    }
}
