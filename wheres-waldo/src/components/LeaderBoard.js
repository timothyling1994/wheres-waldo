import React from "react";
import { useState } from "react";
import { useHistory,Link } from "react-router-dom";
import firebase from "firebase";
import Card from "./Card.js";


function LeaderBoard(props){

	const getData = (level) => {

		let query = firebase.firestore()
                  .collection('leaderboard')
                  .orderBy('time', 'desc')
                  .limit(25);

        console.log(query);
	};

	return(
		
		<div className="LeaderBoard">
			<Link to={"/"} className="link"><div className="header">WHERE'S WALDO</div></Link>
			<div className="leaderboard-header">LEADERBOARD</div>
			<div className="levels-container">
				<div onClick = {() => getData(0)}><Card imgSrc={props.levelSettings[0].imgSrcCropped} pics = {props.levelSettings[0].findPeoplePics} level={"LEVEL 1"}/></div>
				<div onClick = {() => getData(1)}><Card imgSrc={props.levelSettings[1].imgSrcCropped} pics = {props.levelSettings[1].findPeoplePics} level={"LEVEL 2"}/></div>
				<div onClick = {() => getData(2)}><Card imgSrc={props.levelSettings[2].imgSrcCropped} pics = {props.levelSettings[2].findPeoplePics} level={"LEVEL 3"}/></div>
			</div>
			<div className="leaderboard-scores">

			</div>
		</div>

	);
}

export default LeaderBoard;