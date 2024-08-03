import React, { useState } from 'react';
import { GlobeContextProvider, Globe, XYZ, Entity, Vector, GeoObject, Geometry } from "@openglobus/openglobus-react";
import * as og from "@openglobus/og";
import { Slider, TextField, Grid } from '@mui/material';
import "@openglobus/og/css/og.css";


const GlobeComponent = () => {
    const [ mapOpacity, setMapOpacity ] = useState(1);
      
    return (
        <GlobeContextProvider>
            <Grid
                container
                direction="row"
            >
                <Grid
                    item
                    md={3}
                />
                <Grid
                    item
                    md={6}
                >
                    <Slider
                        value={mapOpacity * 100}
                        onChange={(e) => {
                            setMapOpacity(Number((e.target as HTMLInputElement).value ?? 0) / 100);
                        }}
                        color={'primary'}
                    /> 
                    <TextField
                        name="Opacity"
                        id="name"
                        label="Opacity"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type="number"
                        value={mapOpacity}
                    /> 
                </Grid>
            </Grid>    
            <Globe
                atmosphereEnabled
                sun={{active:false}}
                terrain={new og.EmptyTerrain()}
                layers={[new og.Bing("OpenStreetMap")]}               
                >
                <XYZ
                    name={'cridb'}
                    url={"https://eureka.cridb.com/api/tiles/52505/equi/{z}/{x}/{y}.png"}
                    opacity={mapOpacity}
                    isBaseLayer={false}
                    urlRewrite={function (s: { tileX: number; tileY: number; tileZoom: any; }, u: any) {
                        return og.utils.stringTemplate(u, {
                            x: s.tileX,
                            y: s.tileY + Math.pow(2, s.tileZoom - 2),
                            z: s.tileZoom
                        });
                    }}
                />    
                <Vector name={'LinesCircles'}
                        pickingScale={1}
                        pickingEnabled={true}
                        relativeToGround={false}
                        scaleByDistance={[1.0, og.math.MAX32, 1.0]}
                        onLclick={(e) => {
                            console.log(e);
                        }}
                        >
                    <Entity name="Circle1" lon={42.86} lat={10.385} alt={0}>
                        <GeoObject
                            color={"red"}
                            scale={0.015}
                            tag={'pointerSphere'}
                            object3d={og.Object3d.createCylinder(1, 1, 0.1, 16, 16)}
                            />
                    </Entity>
                    <Entity name="Circle2" lon={8.74} lat={40.39} alt={0}>
                        <GeoObject
                            color={"red"}
                            scale={0.015}
                            tag={'pointerSphere'}
                            object3d={og.Object3d.createCylinder(1, 1, 0.1, 16, 16)}
                            />
                    </Entity>
                    <Entity name="Circle3" lon={15.23} lat={21.62} alt={0}>
                        <GeoObject
                            color={"red"}
                            scale={0.015}
                            tag={'pointerSphere'}
                            object3d={og.Object3d.createCylinder(1, 1, 0.1, 16, 16)}
                            />
                    </Entity>
                    <Entity name="Circle4" lon={4.77} lat={13.36} alt={0}>
                        <GeoObject
                            color={"red"}
                            scale={0.015}
                            tag={'pointerSphere'}
                            object3d={og.Object3d.createCylinder(1, 1, 0.1, 16, 16)}
                            />
                    </Entity>
                </Vector>
                <Vector name={'Path'}
                        pickingScale={1}
                        pickingEnabled={true}
                        relativeToGround={false}
                        >
                    <Entity name="Path" lon={0} lat={0} alt={0}>
                        <Geometry
                            lineColor={"red"}
                            lineWidth={10}
                            type={'LINESTRING'}
                            coordinates={[[42.86, 10.385],
                                [8.74, 40.39],
                                [15.23, 21.62],
                                [4.77, 13.36]]}
                           />
                    </Entity>
                </Vector>
            </Globe>
        </GlobeContextProvider>
    );
};

export default GlobeComponent;