import React from "react";
import { useState,useRef } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import Card from "./Card.js";
import uniqid from "uniqid";


function LeaderBoard(props){

	const [listOfUsers,setListOfUsers] = useState([]);

	//const [selected,setSelected] = useState(false);

	const usersRef = useRef([]);

	const getData = (level) => {

		usersRef.current = [];

		{
			let query = firebase.firestore()
                  .collection('leaderboard').doc('level '+level).collection('users')
                  .orderBy('time', 'asc')
                  .limit(25);


	        query.onSnapshot(function(snapshot) {
			    snapshot.docChanges().forEach(function(change) {
			      	if (change.type === 'removed') {
			       		let message = change.doc.data();
			       		let copyArr = [...usersRef.current];
			       		for(let i=0;i<copyArr.length;i++)
			       		{
			       			if(copyArr[i].[0]===message.name && copyArr[i][1]===message.time)
			       			{
			       				copyArr.splice(i,1);
			       			}
			       		}

			       		setListOfUsers(copyArr);
			       		usersRef.current = copyArr;

				    }
				    else
				    {		      	
			      		let message = change.doc.data();
			      		//[[name,time],[name,time]]
			      		let copyArr = [...usersRef.current];
			      		copyArr.push([message.name,message.time]);
			      		setListOfUsers(copyArr);
			      		usersRef.current = copyArr;

				    }
			    });
			});
		}
	};

	const highlightDiv = (event) => {
		event.target.closest(".Card").classList.add("leaderboard-highlight");
	};

	const removeHighlightAllDiv = () =>{
		let nodeList = document.querySelectorAll(".Card");
		nodeList.forEach((div)=>{
			if(div.classList.contains("leaderboard-highlight"))
			{
				div.classList.remove("leaderboard-highlight");
			}
		});
	};	

	const onClickWrapper = (target,levelNum) => {
		getData(levelNum);
		removeHighlightAllDiv();
		highlightDiv(target);
	};

	return(
		
		<div className="LeaderBoard">
			<Link to={"/"} className="link"><div className="header">WHERE'S WALDO</div></Link>
			<div className="leaderboard-header">LEADERBOARD</div>
			<div className="levels-container">
				<div onClick = {(e)=>onClickWrapper(e,0)}><Card imgSrc={props.levelSettings[0].imgSrcCropped} pics = {props.levelSettings[0].findPeoplePics} level={"LEVEL 1"}/></div>
				<div onClick = {(e)=>onClickWrapper(e,1)}><Card imgSrc={props.levelSettings[1].imgSrcCropped} pics = {props.levelSettings[1].findPeoplePics} level={"LEVEL 2"}/></div>
				<div onClick = {(e)=>onClickWrapper(e,2)}><Card imgSrc={props.levelSettings[2].imgSrcCropped} pics = {props.levelSettings[2].findPeoplePics} level={"LEVEL 3"}/></div>
			</div>
			<div className="leaderboard-scores">
				<table>
					<tbody>
						{listOfUsers.length > 0 ?
							<tr>
								<th>Username</th>
								<th>Time</th>
							</tr> :
							null
						}

						{listOfUsers.map((entry)=>{
							return(
								<tr key= {uniqid()} className="entry-container">
									<th className="username">{entry[0]}</th>
									<th className="final-time">{entry[1]+'s'}</th>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>

	);
}

export default LeaderBoard;