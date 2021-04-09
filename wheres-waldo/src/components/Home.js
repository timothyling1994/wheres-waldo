import React from "react";
import Card from "./Card.js";
import { Link } from "react-router-dom";


function Home(props){


	return(
		
		<div className="Home">
			<Link to={"/"} className="link"><div className="header">WHERE'S WALDO</div></Link>
			<div className="levels-container">
				<Link to={"/game"} onClick={()=>props.setLevel(0)} className="link"><Card imgSrc={props.levelSettings[0].imgSrcCropped} pics = {props.levelSettings[0].findPeoplePics} level={"LEVEL 1"}/></Link>
				<Link to={"/game"} onClick={()=>props.setLevel(1)} className="link"><Card imgSrc={props.levelSettings[1].imgSrcCropped} pics = {props.levelSettings[1].findPeoplePics} level={"LEVEL 2"}/></Link>
				<Link to={"/game"} onClick={()=>props.setLevel(2)} className="link"><Card imgSrc={props.levelSettings[2].imgSrcCropped} pics = {props.levelSettings[2].findPeoplePics} level={"LEVEL 3"}/></Link>
			</div>
		</div>

	);
}

export default Home;