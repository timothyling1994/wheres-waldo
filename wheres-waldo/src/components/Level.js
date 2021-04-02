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

	//solution is standardized to this width and height
	const initWidth = 1218;
	const initHeight = 946;

	const [viewPortWidth,setViewPortWidth] = useState(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
	const [viewPortHeight,setViewPortHeight] = useState(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0));

	

	const drawRect = (target) => { 

		clearInvalidRect(); 

		console.log("VW+VH="+viewPortWidth + " " + viewPortHeight);

		let currentRect = target.target.getBoundingClientRect();
		
		//relative to main image container
		let x = target.pageX - currentRect.left;
		let y = target.pageY - currentRect.top;

		console.log(target);
		console.log("x:"+x);
		console.log("y:"+y);
		console.log("offsetx:"+currentRect.left);
		console.log("offsety:"+currentRect.top);
		console.log("pageX:"+target.pageX);
		console.log("pageY:"+target.pageY);
		console.log("window.innerWidth:"+window.innerWidth);



		if(x-50>=0 && y-50>=0)
		{
			let rectBox = document.createElement("div");
			rectBox.classList.add("rectBox");
			//rectBox.style.left=(target.pageX-50)+'px';
			rectBox.style.left=xCoord+'%';
			rectBox.style.top=yCoord+'%';
			//rectBox.style.top=(target.pageY-50)+'px';
			document.body.appendChild(rectBox);

			setCurrentRect(rectBox);
			setCurrentClick([target.pageX,target.pageY]);
			setShowSelectionDropDown(true);
		}
	};

	const clearInvalidRect = () => {
		let elementList = document.querySelectorAll(".rectBox");

		elementList.forEach(element=>{
			if(!element.classList.contains("found"))
			{
				document.body.removeChild(element);
			}
		});
	};
	const clearDropDown = () => {
	
		let dropDown = document.querySelector(".DropDown");
		console.log(dropDown);
		if(dropDown!==null)
		{
			document.body.removeChild(dropDown);
		}
	};

	const clearAllRects = () => {
		console.log("clear");
		let elementList = document.querySelectorAll(".rectBox");

		elementList.forEach(element=>{
			
			document.body.removeChild(element);
			
		});
	};

	const toggleDropDown = (value) => {
		setShowSelectionDropDown(value);
	}

	const getCurrentRect = () =>{
		return currentRect;
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

	const windowResize = () => {
		//console.log(currentClick);
		console.log("width:"+Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
		console.log("height:"+Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0));

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

	/*
	useEffect(()=>{
		window.addEventListener('resize',windowResize);

		return () => {
			window.removeEventListener('resize',windowResize);
		};
	},[currentClick])*/

	useEffect(()=>{
		window.addEventListener('scroll',handleScroll);
		//window.onresize = windowResize;

		return () => {
			window.removeEventListener("scroll", handleScroll)
			clearDropDown();
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
				{showSelectionDropDown ? <DropDown thisLevelSettings={thisLevelSettings} currentClick={currentClick} isCorrectSelection={isCorrectSelection} toggleDropDown={toggleDropDown} getCurrentRect={getCurrentRect} clearInvalidRect={clearInvalidRect}/> : null}
				<img onClick={(target)=>{drawRect(target)}} className="main-img" src={thisLevelSettings.imgSrc} alt="main level"></img>
			</div>
		</div>
	);
}

export default Level;