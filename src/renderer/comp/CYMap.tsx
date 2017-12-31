import * as React from 'react';
import ErrorBoundary from 'react-error-boundary';

import ol from 'ol'
import ol_Map from 'ol/map'
import ol_Feature from 'ol/feature'
import ol_layer_Tile  from 'ol/layer/tile';
import ol_layer_Vector  from 'ol/layer/vector';
import ol_source_OSM from 'ol/source/osm';
import ol_source_Stamen from 'ol/source/stamen';
import ol_source_Vector from 'ol/source/vector';
import ol_layer_Heatmap from 'ol/layer/heatmap'
import ol_geom_Point from 'ol/geom/point'
import ol_format_GeoJSON from 'ol/format/geojson'

import ol_View from 'ol/view';
import ol_Proj from 'ol/proj';

import * as d3 from 'd3'

var json = require('../us-states.json')

console.log('=============',json)

const MyFallbackComponent = ({ componentStack, error }) => (
    <div>
        {componentStack}
        <br/>
        {error}
    </div>
)


// Finally we'll embed it all in an SVG
export class  CYMap extends React.Component {
    olContainer: HTMLDivElement;
    map: any;
    props: any;

    constructor(props) {
        super(props)

        console.log(CYMap, props.data)
    }

    componentDidMount() {
        var geoJson = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [126.717850, 35.013243, 0]
            },
            "properties": {
                "name": "Dinagat Islands"
            }
        }
        var geojson2 = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {"weight": 10},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            14.501953124999998,
                            17.644022027872726
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {"weight": 15},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            15.501953124999998,
                            17.644022027872726
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {"weight": 10},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -232.25897216796875,
                            32.00525315004747
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -233.2191467285156,
                            34.95799531086792
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {"weight": 10},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -233.22052001953122,
                            35.09519259251624
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {"weight": 10},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -233.41827392578125,
                            34.99062863827382
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -233.39904785156247,
                            34.90958403746169
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -233.2218933105469,
                            34.9501163530137
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {"weight": 20},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -233.19305419921875,
                            34.95574425733423
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -233.206787109375,
                            35.14124815600257
                        ]
                    }
                }
            ]
        }

        var sourceVector = new ol_source_Vector({
            // features: (new ol_format_GeoJSON()).readFeatures(geojson2)
        })

        var sv = new ol_source_Vector({
            // format: new ol_format_GeoJSON({defaultDataProjection: 'EPSG:3857'}),
            format: new ol_format_GeoJSON(),
            // format: new ol_format_GeoJSON({defaultDataProjection: 'EPSG:4326'}),
            loader: function (extent, resolution, projection) {
                sv.addFeatures(sv.getFormat().readFeatures(geojson2,{dataProjection:'EPSG:4326', featureProjection:'EPSG:3857'}));
            },
        });

        this.props.data.nodes.forEach((n)=> {
            if(n.labels[0] !== 'station') return;
            var feature = new ol_Feature({
                geometry: new ol_geom_Point(ol_Proj.transform([+n.props.estation_loc_longitude, +n.props.estation_loc_latitude],'EPSG:4326','EPSG:3857')),
            });

            feature.set('weight', n.props.num_echarger / 10);
            sourceVector.addFeature(feature)
        });


        var vector = new ol_layer_Heatmap({
            source: sourceVector,
            blur: 50,
            radius: 10
        });

        this.map = new ol_Map({
            layers: [
                new ol_layer_Tile({
                    source: new ol_source_Stamen({
                        layer: 'toner-lite'
                    })
                }),
                vector
            ],
            view: new ol_View({
                center: ol_Proj.fromLonLat([0.717850, 35.013243]),
                // center: ol_Proj.fromLonLat([126.717850, 35.013243]),
                zoom: 3
            })
        });

        this.map.setTarget(this.olContainer)



        var overlay = new ol_layer_Vector("states");

        // Add the container when the overlay is added to the map.
        overlay.afterAdd = () => {

            console.log('afterAddafterAddafterAddafterAddafterAddafterAdd')
            //get the vector layer div element
            var div = d3.selectAll("#" + overlay.div.id);
            //remove the existing svg element and create a new one
            div.selectAll("svg").remove();
            var svg = div.append("svg");
            //Add a G (group) element
            var g = svg.append("g");
            var bounds = d3.geo.bounds(json),
                path = d3.geo.path().projection(project);
            var feature = g.selectAll("path")
                .data(json.features)
                .enter().append("path");
            this.map.events.register("moveend", this.map, reset);
            reset();

            function reset() {
                var bottomLeft = project(bounds[0]),
                    topRight = project(bounds[1]);

                console.log(bottomLeft, topRight)

                svg.attr("width", topRight[0] - bottomLeft[0])
                    .attr("height", bottomLeft[1] - topRight[1])
                    .style("margin-left", bottomLeft[0] + "px")
                    .style("margin-top", topRight[1] + "px");

                g.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");

                feature.attr("d", path);
            }
            function project(x) {
                var point = this.map.getViewPortPxFromLonLat(new ol.LonLat(x[0], x[1])
                    .transform("EPSG:4326", "EPSG:3857"));
                return [point.x, point.y];
            }
        };


        this.map.addLayer(overlay);
        console.log('sssssssssssssssss')
    }

    componentWillUpdate() {
        this.map.updateSize()
    }

    render() {
        console.log('DataGrid', this.props)

        return (

            <ErrorBoundary  FallbackComponent={MyFallbackComponent}>
                <div ref={el=>this.olContainer=el} style={{height:'100%'}}>
                </div>
            </ErrorBoundary>

        );
    }

}