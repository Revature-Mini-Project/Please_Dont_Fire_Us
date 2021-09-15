import React from 'react';
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const Directions = () => {

    return(
        <div >
            <Card>
                <CardBody>
                <CardTitle tag="h5">The Simon Game</CardTitle>
                <CardTitle tag="h6">The Simon Game</CardTitle>
                <CardText>Get ready to watch, remember, repeat! <br />
                    The Simon game is the exciting electronic game of lights and sounds in which players must <br />
                    repeat random sequences of lights by pressing the colored pads in the correct order.<br />
                    It's fast-paced play, with lights and sounds that can challenge you. <br />
                    Experience the fun as you repeat the patterns and advance to higher levels. <br />
                    Keep track of your score as you challenge friends or try to beat your own high score.<br /></CardText>
                    <CardTitle tag="h6">To begin simply press the start button in the center of the screen.</CardTitle>
                </CardBody>
            </Card>
        </div>
    )
}

export default Directions;