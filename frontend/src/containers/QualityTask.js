import Button from '@material-ui/core/Button';
import React, { useState } from "react";
import ImageWrapper from "../components/ImageWrapper";
import TransferList from "../components/TransferList";


function QualityTask({ account, task }) {
	
	// const [challenges, setChallenges] = useState([]);
	const [currIdx, setCurrIdx] = useState(0);
	const urls = [
		'http://10.1.0.41:2222/api/v1/images/origin_thumbnail.png',
		'http://10.1.0.41:2222/api/v1/images/reference_thumbnail.png',
		'http://10.1.0.41:2222/api/v1/images/combined_in_90_thumbnail.png',
		'http://10.1.0.41:2222/api/v1/images/combined_tin_90_thumbnail.png',
		'http://10.1.0.41:2222/api/v1/images/combined_kin_90_gaussian_3_thumbnail.png',
	]
	const [candidate, setCandidate] = useState(['A', 'B', 'C']);
	const [result, setResult] = useState([]);

	const challenges = [{"challengeID": '0001',  "urls": urls}];
	
	const verifySelection = () => {
		return true
	}
	
	const handleButtonOnClick = () => {
		console.log(result);
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
		// setCurrIdx(currIdx + 1)
	}

	return (
		<>
			<p>Rank the best task</p>
			<div className="flex-container">
				<div className="flex-container-col">
					<ImageWrapper url={challenges[currIdx]["urls"][0]}/>
					Origin
					<ImageWrapper url={challenges[currIdx]["urls"][1]}/>
					Reference
				</div>
				<div className="flex-container-col">
					<div className="flex-container">
						<div className="flex-container-col">
							<ImageWrapper url={challenges[currIdx]["urls"][2]}/>
							A
						</div>
						<div className="flex-container-col">
							<ImageWrapper url={challenges[currIdx]["urls"][3]}/>
							B
						</div>
						<div className="flex-container-col">
							<ImageWrapper url={challenges[currIdx]["urls"][4]}/>
							C
						</div>
					</div>
					<TransferList left={candidate} right={result} setLeft={setCandidate} setRight={setResult}/>
				</div>				
			</div>
			<div className="flex-container">
				<Button 
					variant="contained" 
					color="secondary"
					onClick={handleButtonOnClick}>
					Submit
				</Button>
			</div>
		</>
	)
}

export default QualityTask