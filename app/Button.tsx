import React from "react";
import {useGlobeContext} from "@openglobus/openglobus-react";
import { Button } from '@mui/material';
import { Extent, LonLat } from "@openglobus/og";

export const CustomButton = () => {
    const {globe} = useGlobeContext()
    const onClick = () => {

        if (globe){
            // let destPos = new LonLat(10.13176, 46.18868, 10779);
            // let viewPoi = new LonLat(9.98464, 46.06157, 3039);
            // let lookCart = globe.planet.ellipsoid.lonLatToCartesian(viewPoi);
            // let upVec = globe.planet.ellipsoid.lonLatToCartesian(destPos).normalize();
            // // 0 - is an amplitude of the fly track
            // globe.planet.camera.flyLonLat(destPos, lookCart, upVec, 0);
            globe.planet.flyExtent(new Extent(new LonLat(9.53297, 46.02795), new LonLat(11.56212, 45.78692)));
        }
    }

    return <Button onClick={onClick}>log globe</Button>
}