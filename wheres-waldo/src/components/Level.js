import React from "react";


function Level(props){

	const thisLevelSettings = props.levelSettings[props.getLevel()];

	return(
		<div className="Level">
			<div className="header">WHERE'S WALDO</div>
			<div className="find-people-container">
				<div className="people">
					<img src={thisLevelSettings.findPeoplePics[0]}></img>
					<div className="people-label">{thisLevelSettings.findPeople[0]}</div>
				</div>
				<div className="people">
					<img src={thisLevelSettings.findPeoplePics[1]}></img>
					<div className="people-label">{thisLevelSettings.findPeople[1]}</div>
				</div>
				<div className="people">
					<img src={thisLevelSettings.findPeoplePics[2]}></img>
					<div className="people-label">{thisLevelSettings.findPeople[2]}</div>
				</div>
			</div>
			<img className="main-img" src={thisLevelSettings.imgSrc}></img>
		</div>
	);
}

export default Level;