import React, { useState } from 'react';
import { GlobeContextProvider, Globe, XYZ} from "@openglobus/openglobus-react";
import * as og from "@openglobus/og";
import { Slider, TextField, Grid } from '@mui/material';
import {CustomButton} from "@/app/Button";
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
                    container 
                    md={6}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <CustomButton/>
                </Grid>
                <Grid
                    item
                    md={3}
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
                atmosphereEnabled={false}
                terrain={new og.EmptyTerrain()}
                sun={{active:false}}
                frustums={[[1, 100], [100, 1000],  [1000, 10000], [10000,100000], [100000, 1000000], [1000000, 1000000000]]}
                >
                <XYZ
                    name="google"
                    opacity={1}
                    url="https://mt.google.com/vt/lyrs=s&scale=4&x={x}&y={y}&z={z}"
                    isBaseLayer={true}
                    />
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
            </Globe>
        </GlobeContextProvider>
    );
};

export default GlobeComponent;