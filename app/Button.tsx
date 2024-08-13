import React from "react";
import {useGlobeContext} from "@openglobus/openglobus-react";
import { Button } from '@mui/material';
import { LonLat } from "@openglobus/og";

export const CustomButton = () => {
    const {globe} = useGlobeContext()
    const onClick = () => {

        if (globe){
            globe.planet.camera.flyLonLat(new LonLat(10.13176, 46.18868, 10779));
        }
    }

    return <Button onClick={onClick}>Fly Camera</Button>
}