import React from "react";

function DropDown(props){

	let xCoord = props.currentSelection[0][0];
	let yCoord = props.currentSelection[0][1];

	const myStyle = {
		position:'absolute',
		left: xCoord+props.mainImageOffset[0]+58 + 'px',
		top: yCoord+props.mainImageOffset[1]+'px'
	};	

	const validateSelection = (people_label) => {

		let result = props.isCorrectSelection(people_label);
		if(result)
		{
			let copyArr = [...props.foundObjects];
			copyArr.push([xCoord,yCoord]);
			props.setFoundObjects(copyArr);
			props.toggleDropDown(false);
			props.setSelectionBeforeResize([]);
			props.setCurrentSelection([]);

		}
		else
		{
			let currentRect = document.querySelector(".currentSelection");
			console.log(currentRect);
			currentRect.style.borderColor="red";
			currentRect.classList.add("shake");
			setTimeout(function(){
				props.toggleDropDown(false);
				props.setCurrentSelection([]);
			},1000);
		}
	};

	return(	
		
		<div className="DropDown" style={myStyle}>
			<div className="people-drop-down-container" onClick={()=>{validateSelection(props.thisLevelSettings.findPeople[0])}}>
				<img src={props.thisLevelSettings.findPeoplePics[0]} className="people-pic-drop-down" alt="option for selection"></img>
				<div className="people-label-drop-down">{props.thisLevelSettings.findPeople[0]}</div>
			</div>
			<div className="people-drop-down-container" onClick={()=>{validateSelection(props.thisLevelSettings.findPeople[1])}}>
				<img src={props.thisLevelSettings.findPeoplePics[1]} className="people-pic-drop-down" alt="option for selection"></img>
				<div className="people-label-drop-down">{props.thisLevelSettings.findPeople[1]}</div>
			</div>
			<div className="people-drop-down-container" onClick={()=>{validateSelection(props.thisLevelSettings.findPeople[2])}}>
				<img src={props.thisLevelSettings.findPeoplePics[2]} className="people-pic-drop-down" alt="option for selection"></img>
				<div className="people-label-drop-down">{props.thisLevelSettings.findPeople[2]}</div>
			</div>
		</div>

	);
}

export default DropDown;