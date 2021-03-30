import React from "react";
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown.js";

function Level(props){

	const [scrolled,setScrolled] = useState(false);
	const [currentClick,setCurrentClick] = useState([]);
	const [showSelectionDropDown,setShowSelectionDropDown] = useState(false);
	const thisLevelSettings = props.levelSettings[props.getLevel()];

	const drawRect = (target) => { 
		let elementList = document.querySelectorAll(".rectBox");

		elementList.forEach(element=>{
			if(!element.classList.contains("found"))
			{
				document.body.removeChild(element);
			}
		});


		if(target.pageX-50>=0 && target.pageY-50>=0)
		{
			let rectBox = document.createElement("div");
			rectBox.classList.add("rectBox");
			rectBox.style.left=(target.pageX-50)+'px';
			rectBox.style.top=(target.pageY-50)+'px';
			document.body.appendChild(rectBox);

			showSelectionModal(target.pageX,target.pageY);
		}
	};

	const showSelectionModal = (clickXCoord,clickYCoord) => {

		setCurrentClick([clickXCoord,clickYCoord]);
		setShowSelectionDropDown(true);
	};

	const isCorrectSelection = (xCoord,yCoord,people_label) => {

		if((xCoord >= ((props.solution[people_label][0])-60) && xCoord <= ((props.solution[people_label][0])+60)) && (yCoord >= ((props.solution[people_label][1])-60) && yCoord <= ((props.solution[people_label][1])+60)))
		{
			console.log(true);
			return true;
		}

		console.log(false);
		return false;
	};

	const handleScroll = () => {
		const offset = window.scrollY;
		const main_img = document.querySelector(".main-img-container");

		if(offset>50)
		{
			setScrolled(true);
			main_img.classList.add("shift-main-image");

		}
		else
		{
			setScrolled(false);
			main_img.classList.remove("shift-main-image");
		}

	};

	useEffect(()=>{
		window.addEventListener('scroll',handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	});

	let findPeopleBar = ['find-people-container'];

	if(scrolled)
	{
		findPeopleBar.push('sticky');
	}

	return(
		<div className="Level">
			<Link to={"/"} className="link"><div className="header">WHERE'S WALDO</div></Link>
			<div className={findPeopleBar.join(" ")}>
				<div className="people">
					<div className="people-img-container">
						<img className="people-img" src={thisLevelSettings.findPeoplePics[0]}></img>
					</div>
					<div className="people-label">{thisLevelSettings.findPeople[0]}</div>
				</div>
				<div className="people">
					<div className="people-img-container">
						<img className="people-img" src={thisLevelSettings.findPeoplePics[1]}></img>
					</div>
					<div className="people-label">{thisLevelSettings.findPeople[1]}</div>
				</div>
				<div className="people">
					<div className="people-img-container">
						<img className="people-img" src={thisLevelSettings.findPeoplePics[2]}></img>
					</div>
					<div className="people-label">{thisLevelSettings.findPeople[2]}</div>
				</div>
			</div>
			<div className="main-img-container">
				{showSelectionDropDown ? <DropDown thisLevelSettings={thisLevelSettings} currentClick={currentClick} isCorrectSelection={isCorrectSelection}/> : null}
				<img onClick={(target)=>{drawRect(target)}} className="main-img" src={thisLevelSettings.imgSrc}></img>
			</div>
		</div>
	);
}

export default Level;