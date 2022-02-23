import Button from '@material-ui/core/Button';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageWrapper from '../components/ImageWrapper';
import TransferList from "../components/TransferList";
import configData from "../config.json";


function QualityTask({ account, task }) {

	const rootImageURL = `${configData.SERVER_URL}/api/v1/images/`
	const [challenges, setChallenges] = useState([]);
	const [flag, setFlag] = useState(false);

	
	const getQualityChallenges = () => {
		
		axios.get(`${configData.SERVER_URL}/api/v1/quality_challenges`)
		.then((res) => { 
            var challenges_list = []
			for (var id in res.data.data) {
				const item = Object.assign({"ID": id}, res.data.data[id]);
				challenges_list.push(item);
			}
			setChallenges(challenges_list);
			setFlag(true);
			})
        .catch((error) => { 
            setFlag(false);
            console.error(error);
            }
        );
	};

	useEffect(() => {
		getQualityChallenges();
	},[]);

	const [currIdx, setCurrIdx] = useState(0);
	const [candidate, setCandidate] = useState(['A', 'B', 'C']);
	const [result, setResult] = useState([]);

	const verifySelection = () => {
		return true
	}
	
	const handleButtonOnClick = () => {
		// console.log(result);
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

	const renderChallenge = () => {
		return (
			<>
			<div className="flex-container">
				<div className="flex-container-col">
					<ImageWrapper url={rootImageURL+challenges[currIdx]["origin"]}/>
					Origin
					<ImageWrapper url={rootImageURL+challenges[currIdx]["reference"]}/>
					Reference
				</div>
				<div className="flex-container-col">
					<div className="flex-container">
						<div className="flex-container-col">
							<ImageWrapper url={rootImageURL+challenges[currIdx]["IN"]}/>
							A
						</div>
						<div className="flex-container-col">
							<ImageWrapper url={rootImageURL+challenges[currIdx]["TIN"]}/>
							B
						</div>
						<div className="flex-container-col">
							<ImageWrapper url={rootImageURL+challenges[currIdx]["KIN"]}/>
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

	return (
		<>
			<p>Rank the candidates according to their qualites</p>
			{(flag) ? (
					renderChallenge()
				) : (
					<p>loading</p>
			)}
		</>
	)
}

export default QualityTask