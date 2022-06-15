import React from 'react'
import './InfoBox.css'
import {Card, CardContent, Typography} from '@material-ui/core';

// ...props spreads any property other than title,cases,total passing into
// InfoBox and stores them in props
function InfoBox({title, cases, total, active, isRed, ...props}) {
    return (
        // onClick is a mouse event function in Card component from material UI
        <Card onClick={props.onClickProp} 
        // if property active is true then infoBox--selected classname is 
        // added to class 
        className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} `}>
            <CardContent>
                <Typography className="infoBox_title" color="textSecondary" >
                    {title}
                </Typography>
                <h2 className={`infoBox_cases ${!isRed && "infoBox_cases--green"} `} >{cases}</h2>
                <Typography className="infoBox_total" color="textSecondary" >
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}


export default InfoBox
