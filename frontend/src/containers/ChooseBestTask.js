import Button from '@material-ui/core/Button';
import React, { useState } from "react";
import ImageWrapper from "../components/ImageWrapper";

function ChooseBestTask({account, task}) {
	
	const [challenges, setChallenges] = useState([]);
	const [currIdx, setCurrIdx] = useState(0);
	const urls = [
		'http://10.1.0.41:9292/api/v1/images/IMG_6279.jpg',
		'http://10.1.0.41:9292/api/v1/images/IMG_6368.jpg',
		'http://10.1.0.41:9292/api/v1/images/IMG_6279.jpg',
	]

	const verifySelection = () => {
		return true
	}
	
	const handleButtonOnClick = () => {
		/*
		if (verifySelection()) {
			axios.post('http://10.1.0.41:9292/api/v1/record',{
				account: account,
				task: task,
				challengeID: '41232132',
				choice: 'a'
			})
			.then( (response) => console.log(response))
			.catch( (error) => console.log(error))
		}
		else {
			swal({
				title: "Error",
				text: "Submission failure",
				icon: "error",
			});
		}
		*/
		setCurrIdx(currIdx + 1)
	}

	return (
		<>
			<p>Choose best task</p>
			<ImageWrapper url={urls[currIdx]}/>
			<Button 
				variant="contained" 
				color="secondary"
				onClick={handleButtonOnClick}>
				Submit
			</Button>
		</>
	)
}

export default ChooseBestTask