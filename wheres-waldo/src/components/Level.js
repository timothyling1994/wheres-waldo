import React from "react";
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown.js";

function Level(props){

	const [scrolled,setScrolled] = useState(false);
	const [currentSelection,setCurrentSelection] = useState([]);
	const [foundObjects,setFoundObjects] = useState([]);
	const [selectionBeforeResize,setSelectionBeforeResize] = useState([]);

	const [widthBeforeResize,setWidthBeforeResize] = useState([]);

	const [showSelectionDropDown,setShowSelectionDropDown] = useState(false);
	const thisLevelSettings = props.levelSettings[props.getLevel()];
	const currentLevel = props.getLevel();
	const [finalSolutionObj,setFinalSolutionObj] = useState({});

	//solution is standardized to this width and height
	const initWidth = 1355;
	const initHeight = 946;
	const [mainImageOffset,setMainImageOffset] = useState([]);


	const standardizedSolution = () => {

		let solutionObj = Object.assign({},props.solution);
		for (const property in solutionObj)
		{
			let currentWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
			let currentHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

			let scaledXCoord = (1-(initWidth-currentWidth)/initWidth)*solutionObj[property][0];
			let scaledYCoord = (1-(initWidth-currentWidth)/initWidth)*solutionObj[property][1];

			solutionObj[property]=[scaledXCoord,scaledYCoord];
			console.log(scaledXCoord,scaledYCoord);
		}
		setFinalSolutionObj(solutionObj);
	};

	const init = () => {
		let currentWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		setWidthBeforeResize([currentWidth]);
		standardizedSolution();
	};

	const drawRect = (target) => { 

		let mainImageContainer = target.target.getBoundingClientRect();
		let offsetYScrolled = mainImageContainer.top - document.body.getBoundingClientRect().top;

		setMainImageOffset([mainImageContainer.left, offsetYScrolled]);
		
		//relative to main image container

		let x = target.pageX - mainImageContainer.left;
		let y = target.pageY - offsetYScrolled;

		if(x-50>=0 && y-50>=0)
		{

			let currentCoords=[];
			currentCoords.push([x,y]);
			setCurrentSelection(currentCoords);
			setSelectionBeforeResize(currentCoords);
			setShowSelectionDropDown(true);
		}
	};


	const clearDropDown = () => {
	
		let dropDown = document.querySelector(".DropDown");

		if(dropDown!==null)
		{
			let parentNode = document.querySelector(".DropDown").parentNode;
			parentNode.removeChild(dropDown);
		}
	};

	const clearAllRects = () => {

		let elementList = document.querySelectorAll(".rectBox");

		elementList.forEach(element=>{
			
			let parentNode = element.parentNode;
			parentNode.removeChild(element);
			
		});
	};

	const toggleDropDown = (value) => {
		setShowSelectionDropDown(value);
	}

	const isCorrectSelection = (people_label) => {

		console.log("selection x:"+currentSelection[0][0]);
		console.log("selection x:"+currentSelection[0][1]);
		console.log("solution x:"+finalSolutionObj[people_label][0]);
		console.log("solution y:"+finalSolutionObj[people_label][1]);

		if((currentSelection[0][0] >= ((finalSolutionObj[people_label][0])-60) && currentSelection[0][0] <= ((finalSolutionObj[people_label][0])+60)) && (currentSelection[0][1] >= ((finalSolutionObj[people_label][1])-60) && currentSelection[0][1] <= ((finalSolutionObj[people_label][1])+60)))
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


		if(currentSelection.length !== 0)
		{
			let scaledXCoord = (1-(widthBeforeResize-resizedWidth)/widthBeforeResize)*currentSelection[0][0];
			let scaledYCoord = (1-(widthBeforeResize-resizedWidth)/widthBeforeResize)*currentSelection[0][1];

			setCurrentSelection([[scaledXCoord,scaledYCoord]]);
		}

		if(foundObjects.length !== 0)
		{
			let arrCopy = [];
			for (let i = 0;i<foundObjects.length;i++)
			{
				let scaledXCoord = (1-(widthBeforeResize-resizedWidth)/widthBeforeResize)*foundObjects[i][0];
				let scaledYCoord = (1-(widthBeforeResize-resizedWidth)/widthBeforeResize)*foundObjects[i][1];

				arrCopy.push([scaledXCoord,scaledYCoord]);
			}

			setFoundObjects(arrCopy);
		}

		setWidthBeforeResize(resizedWidth);
		standardizedSolution();

		let mainImageContainer = document.querySelector(".main-img").getBoundingClientRect();
		let offsetYScrolled = mainImageContainer.top - document.body.getBoundingClientRect().top;
		setMainImageOffset([mainImageContainer.left,offsetYScrolled]);
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
		init();
	},[]);
	
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
				{foundObjects.map((value,index)=> {
					return <div className="rectBox found correct" style={{left:mainImageOffset[0]+value[0]-50+'px',top:mainImageOffset[1]+value[1]-50+'px',borderRadius:'50%'}}></div>
				})}
				{currentSelection.map((value,index)=> {
					return <div className="rectBox currentSelection" style={{left:mainImageOffset[0]+value[0]-50+'px',top:mainImageOffset[1]+value[1]-50+'px',borderRadius:'50%'}}></div>
				})}
				{showSelectionDropDown ? <DropDown thisLevelSettings={thisLevelSettings} currentSelection={currentSelection} setCurrentSelection={setCurrentSelection} isCorrectSelection={isCorrectSelection} toggleDropDown={toggleDropDown} mainImageOffset={mainImageOffset} foundObjects={foundObjects} setFoundObjects={setFoundObjects} setSelectionBeforeResize={setSelectionBeforeResize}/> : null}
				<img onClick={(target)=>{drawRect(target)}} className="main-img" src={thisLevelSettings.imgSrc} alt="main level"></img>
			</div>
		</div>
	);
}

export default Level;