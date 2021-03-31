import React from "react";
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown.js";

function Level(props){


	const [scrolled,setScrolled] = useState(false);
	const [currentClick,setCurrentClick] = useState([]);
	const [currentRect,setCurrentRect] = useState();
	const [showSelectionDropDown,setShowSelectionDropDown] = useState(false);
	const thisLevelSettings = props.levelSettings[props.getLevel()];
	const currentLevel = props.getLevel();

	const drawRect = (target) => { 

		clearNotFoundRect(); 

		if(target.pageX-50>=0 && target.pageY-50>=0)
		{
			let rectBox = document.createElement("div");
			rectBox.classList.add("rectBox");
			rectBox.style.left=(target.pageX-50)+'px';
			rectBox.style.top=(target.pageY-50)+'px';
			document.body.appendChild(rectBox);

			setCurrentRect(rectBox);
			showSelectionModal(target.pageX,target.pageY);
		}
	};

	const clearNotFoundRect = () => {
		let elementList = document.querySelectorAll(".rectBox");

		elementList.forEach(element=>{
			if(!element.classList.contains("found"))
			{
				document.body.removeChild(element);
			}
		});
	};

	const clearAllRects = () => {
		console.log("clear");
		let elementList = document.querySelectorAll(".rectBox");

		elementList.forEach(element=>{
			
			document.body.removeChild(element);
			
		});
	};

	const showSelectionModal = (clickXCoord,clickYCoord) => {

		setCurrentClick([clickXCoord,clickYCoord]);
		setShowSelectionDropDown(true);
	};

	const toggleDropDown = (value) => {
		setShowSelectionDropDown(value);
	}

	const getCurrentRect = () =>{
		return currentRect;
	};

	const isCorrectSelection = (xCoord,yCoord,people_label) => {

		console.log("current:"+xCoord);
		console.log("current:"+yCoord);
		console.log(people_label);
		console.log("solution:"+props.solution[people_label][0]);
		console.log("solution:"+props.solution[people_label][1]);

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

		return () => {
			window.removeEventListener("scroll", handleScroll)
			clearAllRects();
		};
	},[currentLevel]);

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
						<img className="people-img" src={thisLevelSettings.findPeoplePics[0]} alt="find this person"></img>
					</div>
					<div className="people-label">{thisLevelSettings.findPeople[0]}</div>
				</div>
				<div className="people">
					<div className="people-img-container">
						<img className="people-img" src={thisLevelSettings.findPeoplePics[1]} alt="find this person"></img>
					</div>
					<div className="people-label">{thisLevelSettings.findPeople[1]}</div>
				</div>
				<div className="people">
					<div className="people-img-container">
						<img className="people-img" src={thisLevelSettings.findPeoplePics[2]} alt="find this person"></img>
					</div>
					<div className="people-label">{thisLevelSettings.findPeople[2]}</div>
				</div>
			</div>
			<div className="main-img-container">
				{showSelectionDropDown ? <DropDown thisLevelSettings={thisLevelSettings} currentClick={currentClick} isCorrectSelection={isCorrectSelection} toggleDropDown={toggleDropDown} getCurrentRect={getCurrentRect} clearNotFoundRect={clearNotFoundRect}/> : null}
				<img onClick={(target)=>{drawRect(target)}} className="main-img" src={thisLevelSettings.imgSrc} alt="main level"></img>
			</div>
		</div>
	);
}

export default Level;