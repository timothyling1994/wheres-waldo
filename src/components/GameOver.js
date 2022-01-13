import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "firebase";


function GameOver(props){

	const submit_score = () => {
		//write to firestore of username and score
		let username = document.querySelector(".name-input").value;
		let final_time = Math.round(props.finalTime*100)/100;

		firebase.firestore().collection('leaderboard').doc("level "+ props.currentLevel).collection('users').doc(props.getTimerSession).set({
			name:username,
			time:final_time
		});


		props.toggleGameOverModal(false);
		props.history.push("/leaderboard");
		
	};

	const cancel = () => {

		props.toggleGameOverModal(false);
		props.history.push("/");
	}

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
					<div className="modal-cancel" onClick={cancel}>CANCEL</div>
				</div>

			</div>
		</div>

	);
}

export default withRouter(GameOver);