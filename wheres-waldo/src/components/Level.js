import React from "react";
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown.js";
import GameOver from "./GameOver.js";
import firebase from "firebase";
import uniqid from "uniqid";

function Level(props){

	const [currentSelection,setCurrentSelection] = useState([]);
	const [foundObjects,setFoundObjects] = useState([]);

	const [widthBeforeResize,setWidthBeforeResize] = useState([]);

	const [findPeopleAttributes,setFindPeopleAttributes] = useState(['find-people-container']);
	const [peopleImgAttributes,setPeopleImgAttributes] = useState([['people-img'],['people-img'],['people-img']]);
	const [peopleDropDownAttributes,setPeopleDropDownAttributes] = useState([['people-drop-down-container'],['people-drop-down-container'],['people-drop-down-container']]);


	const [showSelectionDropDown,setShowSelectionDropDown] = useState(false);
	const thisLevelSettings = props.levelSettings[props.getLevel()];
	const currentLevel = props.getLevel();
	const [initSolutionObj,setInitSolutionObj] = useState({});
	const [finalSolutionObj,setFinalSolutionObj] = useState({});

	//solution is standardized to this width and height
	const initWidth = 1355;
	//const initHeight = 946;
	const [mainImageOffset,setMainImageOffset] = useState([]);

	const [startTimerId,setStartTimerId] = useState(0);
	const [markCounter,setMarkCounter] = useState(0);
	const [finalTime,setFinalTime] = useState(0);

	const [gameOver,setGameOver] = useState(false);


	const startTimer = () => {
		let start_time = new Date().getTime()/1000;

		firebase.firestore().collection('timers').add({
			startTime: start_time,
		}).then(function(messsageRef){
			console.log(messsageRef.id);
			props.setTimerSession(messsageRef.id);
			setStartTimerId(messsageRef.id);
		}).catch(function(error){
			console.error("There was an error uploading to Cloud Storage:",error);
		})
	};


	const isGameOver = async () => {
		if(markCounter === 3)
		{
			console.log("game over!");
			let startTimeRef = firebase.firestore().collection('timers').doc(startTimerId);

			try
			{
				let docRef = await startTimeRef.get();
				if(docRef.exists)
				{

					let start_time = docRef.data()['startTime'];
					let end_time = new Date().getTime()/1000;

					console.log(end_time-start_time);
					setFinalTime(end_time-start_time);
					setGameOver(true);

				}
				else
				{
					console.log("No such document!");
				}
			}
			catch (error)
			{
				console.log("Error getting document:",error);
			}
		}
	};


	const standardizedSolution = () => {

		//let solutionObj = Object.assign({},props.solution);
		let solutionObj = Object.assign({},initSolutionObj);
	
		for (const property in solutionObj)
		{
			let currentWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
			//let currentHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

			let scaledXCoord = (1-(initWidth-currentWidth)/initWidth)*solutionObj[property][0];
			let scaledYCoord = (1-(initWidth-currentWidth)/initWidth)*solutionObj[property][1];

			solutionObj[property]=[scaledXCoord,scaledYCoord];
		}
		setFinalSolutionObj(solutionObj);
	};

	const init = async () => {

		let currentWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		setWidthBeforeResize([currentWidth]);

		try
		{
			await callFireStore();
		}
		catch(err)
		{
			console.log('Error getting documents',err);
		}
	};

	const callFireStore = async () => {
		let solutionsRef = firebase.firestore().collection('solutions').doc('level'+(props.getLevel()+1));
		
		try
		{
			let docRef = await solutionsRef.get();
			if(docRef.exists)
			{
				setInitSolutionObj(docRef.data());
			}
			else
			{
				console.log("No such document!");
			}
		}
		catch (error)
		{
			console.log("Error getting document:",error);
		}
	};

	const markFound = (index) => {

		let copyArr = [...peopleImgAttributes];
		copyArr[index].push("person-found");
		setPeopleImgAttributes(copyArr);

		let copyArr2 = [...peopleDropDownAttributes];
		copyArr2[index].push("person-found-dropdown");
		setPeopleDropDownAttributes(copyArr2);

		setMarkCounter((prev)=>prev+1);
	};

	const drawCircle = (target) => { 

		let mainImageContainer = target.target.getBoundingClientRect();
		let offsetYScrolled = mainImageContainer.top - document.body.getBoundingClientRect().top;

		setMainImageOffset([mainImageContainer.left, offsetYScrolled]);
		
		//relative to main image container

		let x = target.pageX - mainImageContainer.left;
		let y = target.pageY - offsetYScrolled;

		console.log(x,y);

		if(x-20>=0 && y-20>=0)
		{

			let currentCoords=[];
			currentCoords.push([x,y]);
			setCurrentSelection(currentCoords);
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

	const clearAllCircles = () => {

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
		//let resizedHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);


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
			setFindPeopleAttributes(['find-people-container','sticky']);
			if(main_img !== null)
			{
				main_img.classList.add("shift-main-image");
			}

		}
		else
		{
			setFindPeopleAttributes(['find-people-container']);
			if(main_img !== null)
			{
				main_img.classList.remove("shift-main-image");
			}
		}

	};

	const toggleGameOverModal = (value) => {
		setGameOver(value);
	};

	useEffect(()=>{
		init();
		startTimer();
	},[]);

	useEffect(()=>{
		standardizedSolution();
	},[initSolutionObj]);

	useEffect(()=>{

		console.log("scroll");
		window.addEventListener('scroll',handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			clearDropDown();
			clearAllCircles();
		};
	},[currentLevel]);

	useEffect(()=>{
		window.addEventListener('resize',windowResize);

		return () => {
			window.removeEventListener('resize',windowResize);
		};
	});


	useEffect(()=>{
		isGameOver();
	},[markCounter]);
	
	return(
		<div className="Level">
			<Link to={"/"} className="link"><div className="header">WHERE'S WALDO</div></Link>
			<div className="game-over-modal">
				{gameOver ? <GameOver finalTime={finalTime} toggleGameOverModal={toggleGameOverModal} currentLevel={currentLevel} getTimerSession={props.getTimerSession}/> : null}
			</div>
			<div className={findPeopleAttributes.join(" ")}>
				<div className="people">
					<div className="people-img-container">
						<img className={peopleImgAttributes[0].join(" ")} src={thisLevelSettings.findPeoplePics[0]} alt="find this person"></img>
					</div>
					<div className="people-label">{thisLevelSettings.findPeople[0]}</div>
				</div>
				<div className="people">
					<div className="people-img-container">
						<img className={peopleImgAttributes[1].join(" ")} src={thisLevelSettings.findPeoplePics[1]} alt="find this person"></img>
					</div>
					<div className="people-label">{thisLevelSettings.findPeople[1]}</div>
				</div>
				<div className="people">
					<div className="people-img-container">
						<img className={peopleImgAttributes[2].join(" ")} src={thisLevelSettings.findPeoplePics[2]} alt="find this person"></img>
					</div>
					<div className="people-label">{thisLevelSettings.findPeople[2]}</div>
				</div>
			</div>
			<div className="main-img-container">
				{foundObjects.map((value,index)=> {
					return <div className="rectBox found correct" key={uniqid()} style={{left:mainImageOffset[0]+value[0]-50+'px',top:mainImageOffset[1]+value[1]-50+'px',borderRadius:'50%'}}></div>
				})}
				{currentSelection.map((value,index)=> {
					return <div className="rectBox currentSelection" key={uniqid()} style={{left:mainImageOffset[0]+value[0]-50+'px',top:mainImageOffset[1]+value[1]-50+'px',borderRadius:'50%'}}></div>
				})}
				{showSelectionDropDown ? <DropDown thisLevelSettings={thisLevelSettings} key={uniqid()} currentSelection={currentSelection} setCurrentSelection={setCurrentSelection} isCorrectSelection={isCorrectSelection} toggleDropDown={toggleDropDown} mainImageOffset={mainImageOffset} foundObjects={foundObjects} setFoundObjects={setFoundObjects} markFound={markFound} peopleDropDownAttributes={peopleDropDownAttributes}/> : null}
				<img onClick={(target)=>{drawCircle(target)}} className="main-img" src={thisLevelSettings.imgSrc} alt="main level"></img>
			</div>
		</div>
	);
}

export default Level;