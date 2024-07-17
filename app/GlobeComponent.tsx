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
                justify="space-around"
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
                            setMapOpacity(Number(e.target.value /100.0));
                            cridb.opacity = Number(e.target.value /100.0);
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