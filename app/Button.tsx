import React, { useState } from "react";
import {useGlobeContext} from "@openglobus/openglobus-react";
import { Button } from '@mui/material';
import { Entity, Layer, LonLat, math, Object3d, Vector } from "@openglobus/og";

export const CustomButton = () => {
    const {globe} = useGlobeContext()

    let position = 0
    let coords = [
        [42.86, 10.385],
        [8.74, 40.39],
        [15.23, 21.62],
        [4.77, 13.36]
    ];

    const pointerSphere = Object3d.createCylinder(1, 1, 0.1, 16, 16);

    let poi = new Vector("LinesCircles", {
        pickingScale: 1,
        pickingEnabled: true,
        scaleByDistance: [1.0, math.MAX32, 1.0],
        relativeToGround: false,
        //polygonOffsetUnits: 0
    });
    
    let pathEntity = new Entity({
        polyline: {
            thickness: 15,
            color: "red",
            pathLonLat: []
        }
    })

    let path = new Vector("Path", {
        pickingEnabled: false,
        relativeToGround: false,
        entities: [pathEntity],
        //polygonOffsetUnits: 0,
    });

    function getPath(ell: { inverse: (arg0: any, arg1: any) => { distance: any; initialAzimuth: any; }; getGreatCircleDestination: (arg0: any, arg1: any, arg2: number) => any; lonLatToCartesian: (arg0: any) => any; }, start: LonLat, end: LonLat) {
        const POINTS_NUMBER = 70;
        const HEIGHT_DENOM = 17;
        const P25 = 0.25;
        const P75 = 0.75;

        let {distance, initialAzimuth} = ell.inverse(start, end);

        let p25 = ell.getGreatCircleDestination(start, initialAzimuth, distance * P25),
            p75 = ell.getGreatCircleDestination(start, initialAzimuth, distance * P75);

        start.height = 0;
        end.height = 0;
        let h = distance / HEIGHT_DENOM;
        p25.height = h;
        p75.height = h;

        let startCart = ell.lonLatToCartesian(start),
            endCart = ell.lonLatToCartesian(end),
            p25Cart = ell.lonLatToCartesian(p25),
            p75Cart = ell.lonLatToCartesian(p75);

        let path = [],
            colors = [];

        let color = [math.random(0, 2), math.random(0, 2), math.random(0, 2)];

        for (let i = 0; i <= POINTS_NUMBER; i++) {
            let cn = math.bezier3v(i / POINTS_NUMBER, startCart, p25Cart, p75Cart, endCart);
            // bugfix with polylines on the edge
            if (i === 0 || i === POINTS_NUMBER) {
                path.push(cn);
            }
            path.push(cn);
            colors.push([color[0], color[1], color[2], 0.1]);
        }

        return {
            path: path,
            colors: colors
        };
    }

    const flyCamera = () => {

        if (globe){
            globe.planet.camera.flyLonLat(new LonLat(coords[position][0], coords[position][1], 10779));
            position= position >= coords.length - 1 ? 0: position + 1;
        }
    }

    const drawPath = () => {

        if (globe){
                       
            let poiArr = [];
            let pathArr = [];
        
            for (let i = 0; i < coords.length; i++) {
        
                let ci = coords[i];
        
                if (i < coords.length - 1) {
                    pathArr.push(getPath(globe.planet.ellipsoid, new LonLat(coords[i][0], coords[i][1]), new LonLat(coords[i + 1][0], coords[i + 1][1])).path);
                }
        
                poiArr.push(new Entity({
                    lonlat: new LonLat(ci[0], ci[1], 0),
                    geoObject: {
                        color: "red",
                        scale: 0.015,
                        instanced: true,
                        tag: `pointerSphere`,
                        object3d: pointerSphere
                    },
                    properties: {
                        name: "First"
                    }
                }));
            }
        
            poi.setEntities(poiArr);
        
            if (pathEntity.polyline) {
                pathEntity.polyline.setPath3v(pathArr);
            }
            
            globe.planet.addLayers([path, poi]);
        }
    }

    const getCurrentPosition = () => {
        if (globe) {
            console.log(globe.planet.camera.getLonLat());
        }
    }

    if (globe) {
        globe.planet?.renderer?.events.on("mousemove", function (e) {
            if (e.pickingObject) {
                console.log(e.pickingObject.name);
            }
            getCurrentPosition();
        });
    
        globe.planet?.renderer?.events.on("lclick", function (e) {
            if (e.pickingObject instanceof Layer) {
                e.pickingObject.bringToFront();
            }
        });
    }

    return <>
    <Button variant="contained" color="success" size="large" onClick={flyCamera} style={{margin:10}}>Fly To</Button>
    <Button variant="contained" color="info" size="large" onClick={drawPath} style={{margin:10}}>Draw Path</Button>
    <Button variant="contained" color="info" size="large" onClick={getCurrentPosition} style={{margin:10}}>Get Current Position</Button>
    </>
}