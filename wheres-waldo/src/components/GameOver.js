import React from "react";
import Card from "./Card.js";
import { useHistory,Link } from "react-router-dom";
import firebase from "firebase";


function GameOver(props){

	const submit_score = () => {
		//write to firestore of username and score
		let username = document.querySelector(".name-input").value;
		let final_time = Math.round(props.finalTime*100)/100;

		firebase.firestore().collection('leaderboard').add({
			name:username,
			time:final_time
		});

		//const history = useHistory();

		props.toggleGameOverModal(false);
		//history.push('/');
	};

	return(
		
		<div className="GameOver">
			<div className="modal-container">
				<div className="modal-header">YOU FINISHED IN: {Math.round(props.finalTime*100)/100} seconds!</div>
				<div className="modal-description">ENTER YOUR NAME:</div>
				<div className="modal-input">
					<input className="name-input" style={{textTransform:"uppercase"}}></input>
				</div>
				<div className="modal-button-row">
					<div className="modal-submit" onClick={submit_score}>SUBMIT</div>
					<div className="modal-cancel">CANCEL</div>
				</div>

			</div>
		</div>

	);
}

export default GameOver;