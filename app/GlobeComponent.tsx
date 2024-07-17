import React, { useState } from 'react';
import { GlobeContextProvider, Globe } from "@openglobus/openglobus-react";
import * as og from "@openglobus/og";
import { Slider, TextField, Grid } from '@mui/material';
import "@openglobus/og/css/og.css";


const GlobeComponent = () => {
    const [ mapOpacity, setMapOpacity ] = useState(1.0);
      
    let bing = new og.Bing("OpenStreetMap");
    var cridb = new og.layer.XYZ("CRIDBMap", {
        url: "https://eureka.cridb.com/api/tiles/52505/equi/{z}/{x}/{y}.png",
        opacity: mapOpacity,
        isBaseLayer: false,
        urlRewrite: function (s: { tileX: number; tileY: number; tileZoom: any; }, u: any) {
            return og.utils.stringTemplate(u, {
                x: s.tileX,
                y: s.tileY + Math.pow(2, s.tileZoom - 2),
                z: s.tileZoom
            });
        },
    });

    return (
        <GlobeContextProvider>
            <Grid
                container
                direction="row"
            >
                <Grid
                    item
                    md={3}
                ></Grid>
                <Grid
                    item
                    md={6}
                >
                    <Slider
                        value={mapOpacity * 100}
                        onChange={(e) => {
                            let opacityVal = Number((e.target as HTMLInputElement).value ?? 0) / 100;
                            setMapOpacity(opacityVal);
                            cridb.opacity = opacityVal;
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
                sunActive={false}
                atmosphereEnabled={false}
                layers={[bing, cridb]}
                >  
            </Globe>
        </GlobeContextProvider>
    );
};

export default GlobeComponent;