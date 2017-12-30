import * as React from 'react';
import ErrorBoundary from 'react-error-boundary';

import ol_Map from 'ol/map'
import ol_Feature from 'ol/feature'
import ol_layer_Tile  from 'ol/layer/tile';
import ol_source_OSM from 'ol/source/osm';
import ol_source_Stamen from 'ol/source/stamen';
import ol_source_Vector from 'ol/source/vector';
import ol_layer_Heatmap from 'ol/layer/heatmap'
import ol_geom_Point from 'ol/geom/point'
import ol_format_GeoJSON from 'ol/format/geojson'

import ol_View from 'ol/view';
import ol_Proj from 'ol/proj';




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

    constructor(props) {
        super(props)

        console.log(props)
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
        let feature = new ol_Feature({
            // geometry: new ol_geom_Point(ol_Proj.fromLonLat([0, 0])),
            geometry: new ol_geom_Point(ol_Proj.fromLonLat([35.013243, 26.717850])),
            // labelPoint: new ol_geom_Point([35.013243, 26.717850]),
            name: 'ccccc'
        });

        var sv = new ol_source_Vector({
            // format: new ol_format_GeoJSON({defaultDataProjection: 'EPSG:3857'}),
            format: new ol_format_GeoJSON(),
            // format: new ol_format_GeoJSON({defaultDataProjection: 'EPSG:4326'}),
            loader: function (extent, resolution, projection) {

                sv.addFeatures(sv.getFormat().readFeatures(geojson2,{dataProjection:'EPSG:4326', featureProjection:'EPSG:3857'}));
                // sv.addFeatures(sv.getFormat().readFeatures(geojson2));

            },
        });

        feature.set('weight',100)
        feature.set('name','ccccc')
        feature.setId('ccccc')
        feature.setGeometryName('ccccc')

        sourceVector.addFeature(feature)

        var vector = new ol_layer_Heatmap({
            // source: sourceVector,
            source: sv,
            blur: 20,
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