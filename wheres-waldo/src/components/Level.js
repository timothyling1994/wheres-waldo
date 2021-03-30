import React from "react";
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";

function Level(props){

	const [scrolled,setScrolled] = useState(false);
	const thisLevelSettings = props.levelSettings[props.getLevel()];

	const drawRect = (target) => { 
		console.log(target.pageX);
		if(target.pageX-50>=0 && target.pageY-50>=0)
		{
			let rectBox = document.createElement("div");
			rectBox.classList.add("rectBox");
			rectBox.style.left=(target.pageX-50)+'px';
			rectBox.style.top=(target.pageY-50)+'px';
			document.body.appendChild(rectBox);
		}
	};

	const handleScroll = () => {
		const offset = window.scrollY;
		if(offset>200)
		{
			setScrolled(true);
		}
		else
		{
			setScrolled(false);
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
					<img className="people-img" src={thisLevelSettings.findPeoplePics[0]}></img>
					<div className="people-label">{thisLevelSettings.findPeople[0]}</div>
				</div>
				<div className="people">
					<img className="people-img" src={thisLevelSettings.findPeoplePics[1]}></img>
					<div className="people-label">{thisLevelSettings.findPeople[1]}</div>
				</div>
				<div className="people">
					<img className="people-img" src={thisLevelSettings.findPeoplePics[2]}></img>
					<div className="people-label">{thisLevelSettings.findPeople[2]}</div>
				</div>
			</div>
			<div className="main-img-container"><img onClick={(target)=>{drawRect(target)}} className="main-img" src={thisLevelSettings.imgSrc}></img></div>
		</div>
	);
}

export default Level;