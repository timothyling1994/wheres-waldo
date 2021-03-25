import React from "react";
import {useState} from "react";


function Card(props){


	return(
		<div className="Card">
			<img src={props.imgSrc}></img>
			<div className="card-description">
				<div className="level">{props.level}</div>
				<div className="profile-pic-container">
					<img src={props.pics[0]}></img>
					<img src={props.pics[1]}></img>
					<img src={props.pics[2]}></img>
				</div>
			</div>
		</div>

	);
}

export default Card;