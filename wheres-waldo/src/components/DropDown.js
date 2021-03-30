import React from "react";



function DropDown(props){

	//console.log(props.currentClick[0]);
	//console.log(props.currentClick[1]);

	let xCoord;
	let yCoord = props.currentClick[1];

	if(props.currentClick[0]>1000)
	{
		let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		xCoord = props.currentClick[0]-(vw*0.15)-50;
	}
	else
	{
		xCoord = props.currentClick[0]+53;
	}

	const myStyle = {
		position:'absolute',
		left: xCoord+'px',
		top: yCoord+'px'
	};	

	const validateSelection = (people_label) => {
		let result = props.isCorrectSelection(props.currentClick[0],props.currentClick[1],people_label);
	};




	return(	
		
		<div className="DropDown" style={myStyle}>
			<div className="people-drop-down-container" onClick={()=>{validateSelection(props.thisLevelSettings.findPeople[0])}}>
				<img src={props.thisLevelSettings.findPeoplePics[0]} className="people-pic-drop-down"></img>
				<div className="people-label-drop-down">{props.thisLevelSettings.findPeople[0]}</div>
			</div>
			<div className="people-drop-down-container" onClick={()=>{validateSelection(props.thisLevelSettings.findPeople[1])}}>
				<img src={props.thisLevelSettings.findPeoplePics[1]} className="people-pic-drop-down"></img>
				<div className="people-label-drop-down">{props.thisLevelSettings.findPeople[1]}</div>
			</div>
			<div className="people-drop-down-container" onClick={()=>{validateSelection(props.thisLevelSettings.findPeople[2])}}>
				<img src={props.thisLevelSettings.findPeoplePics[2]} className="people-pic-drop-down"></img>
				<div className="people-label-drop-down">{props.thisLevelSettings.findPeople[2]}</div>
			</div>
		</div>

	);
}

export default DropDown;