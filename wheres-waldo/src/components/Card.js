import React from "react";

function Card(props){

	return(
		<div className="Card">
			<img src={props.imgSrc} alt="main level"></img>
			<div className="card-description">
				<div className="level-label">{props.level}</div>
				<div className="profile-pic-container">
					<img src={props.pics[0]} alt="find this person #1"></img>
					<img src={props.pics[1]} alt="find this person #2"></img>
					<img src={props.pics[2]} alt="find this person #3"></img>
				</div>
			</div>
		</div>

	);
}

export default Card;