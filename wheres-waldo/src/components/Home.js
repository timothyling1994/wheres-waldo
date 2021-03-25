import React from "react";
import Card from "./Card.js";


function Home(props){

	const levelOnePics = ["assets/sarah-conner.png","assets/morpheus.png","assets/sonny.png"];
	const levelTwoPics = ["assets/sarah-conner.png","assets/morpheus.png","assets/sonny.png"];
	const levelThreePics = ["assets/sarah-conner.png","assets/morpheus.png","assets/sonny.png"];



	return(
		<div className="Home">
			<div className="header">WHERE'S WALDO</div>
			<div className="levels-container">
				<Card imgSrc={"assets/level-one-cropped.png"} pics = {levelOnePics} level={"LEVEL 1"}/>
				<Card imgSrc={"assets/level-two-cropped.png"} pics = {levelTwoPics} level={"LEVEL 2"}/>
				<Card imgSrc={"assets/level-three-cropped.png"} pics = {levelThreePics} level={"LEVEL 3"}/>
			</div>
		</div>

	);
}

export default Home;