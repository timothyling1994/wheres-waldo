import React from "react";
import { useState,useRef } from "react";
import { useHistory,Link } from "react-router-dom";
import firebase from "firebase";
import Card from "./Card.js";


function LeaderBoard(props){

	const [listOfUsers,setListOfUsers] = useState([]);

	//const [selected,setSelected] = useState(false);

	const usersRef = useRef([]);

	const getData = (level) => {

		usersRef.current = [];
		//if(!selected)
		{
			let query = firebase.firestore()
                  .collection('leaderboard').doc('level '+level).collection('users')
                  .orderBy('time', 'asc')
                  .limit(25);


	        query.onSnapshot(function(snapshot) {
			    snapshot.docChanges().forEach(function(change) {

			      	if (change.type == 'removed') {
			       		console.log('DIFFERENT');
				    }
				    else
				    {		      	
			      		let message = change.doc.data();

			      		//[[name,time],[name,time]]
			      		let copyArr = [...usersRef.current];
			      		//let copyArr = [...listOfUsers];
			      		console.log("copyArr");
			      		console.log(copyArr);
			      		copyArr.push([message.name,message.time]);
			      		console.log(copyArr);
			      		setListOfUsers(copyArr);
			      		usersRef.current = copyArr;

				    }
			    });
			});
		}
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
				{listOfUsers.map((entry)=>{
					return(
						<div className="entry-row">
							<div className="username">{entry[0]}</div>
							<div className="final-time">{entry[1]}</div>
						</div>
					)
				})}
			</div>
		</div>

	);
}

export default LeaderBoard;