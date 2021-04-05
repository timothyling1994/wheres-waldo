import React from "react";
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown.js";

function Level(props){

	const [scrolled,setScrolled] = useState(false);
	const [currentClick,setCurrentClick] = useState([]);
	const [currentRect,setCurrentRect] = useState();
	const [selections,setSelections] = useState([]);
	const [showSelectionDropDown,setShowSelectionDropDown] = useState(false);
	const thisLevelSettings = props.levelSettings[props.getLevel()];
	const currentLevel = props.getLevel();

	//solution is standardized to this width and height
	const initWidth = 1355;
	const initHeight = 946;

	const [viewPortWidth,setViewPortWidth] = useState(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
	const [viewPortHeight,setViewPortHeight] = useState(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0));

	const [mainImageOffset,setMainImageOffset] = useState([]);

	const drawRect = (target) => { 

		clearInvalidRect(); 

		let mainImageContainer = target.target.getBoundingClientRect();

		setMainImageOffset([mainImageContainer.left, mainImageContainer.top]);

		console.log("VW+VH="+viewPortWidth + " " + viewPortHeight);
		
		//relative to main image container
		let x = target.pageX - mainImageContainer.left;
		let y = target.pageY - mainImageContainer.top;

		if(x-50>=0 && y-50>=0)
		{

			console.log(x,y);
			let arrayCopy = [...selections];
			arrayCopy.push([x,y]);
			console.log("arrayCopy"+arrayCopy);
			setSelections(arrayCopy);

	
			//setCurrentRect(rectBox);
			setCurrentClick([x,y]);
			setShowSelectionDropDown(true);
		}
	};

	const clearInvalidRect = () => {
		let elementList = document.querySelectorAll(".rectBox");

		elementList.forEach(element=>{
			if(!element.classList.contains("found"))
			{
				let parentNode = element.parentNode;
				parentNode.removeChild(element);
			}
		});
	};
	const clearDropDown = () => {
	
		let dropDown = document.querySelector(".DropDown");

		console.log(dropDown);
		if(dropDown!==null)
		{
			let parentNode = document.querySelector(".DropDown").parentNode;
			parentNode.removeChild(dropDown);
		}
	};

	const clearAllRects = () => {
		console.log("clear");
		let elementList = document.querySelectorAll(".rectBox");

		elementList.forEach(element=>{
			
			let parentNode = element.parentNode;
			parentNode.removeChild(element);
			
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
		
		let resizedWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		let resizedHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

		let scaledXCoord = (1-(initWidth-resizedWidth)/initWidth)*props.solution["SONNY"][0];
		let scaledYCoord = (1-(initWidth-resizedWidth)/initWidth)*props.solution["SONNY"][1];

		console.log("scaled:"+scaledXCoord,scaledYCoord);

		setSelections([[scaledXCoord,scaledYCoord]]);

		let mainImageContainer = document.querySelector(".main-img").getBoundingClientRect();
		setMainImageOffset([mainImageContainer.left,mainImageContainer.top]);

		//let mainImageContainer = target.target.getBoundingClientRect();

		//setMainImageOffset([mainImageContainer.left, mainImageContainer.top]);
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
		window.addEventListener('resize',windowResize);

		return () => {
			window.removeEventListener('resize',windowResize);
		};
	});

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
				{selections.map((value,index)=> {
					console.log("diff:"+value[0]);
					console.log("diff:"+value[1]);
					return <div className="rectBox" style={{left:mainImageOffset[0]+value[0]-50+'px',top:mainImageOffset[1]+value[1]-50+'px'}}></div>
				})}
				{showSelectionDropDown ? <DropDown thisLevelSettings={thisLevelSettings} currentClick={currentClick} isCorrectSelection={isCorrectSelection} toggleDropDown={toggleDropDown} getCurrentRect={getCurrentRect} clearInvalidRect={clearInvalidRect}/> : null}
				<img onClick={(target)=>{drawRect(target)}} className="main-img" src={thisLevelSettings.imgSrc} alt="main level"></img>
			</div>
		</div>
	);
}

export default Level;