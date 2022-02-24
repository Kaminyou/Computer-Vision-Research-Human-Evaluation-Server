import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import ImageWrapper from '../components/ImageWrapper';
import TransferList from "../components/TransferList";
import configData from "../config.json";


function QualityTask({ account, task, setAccount, setTask}) {

	const rootImageURL = `${configData.SERVER_URL}/api/v1/images/`
	const [challenges, setChallenges] = useState([]);
	const [flag, setFlag] = useState(false);
	const [currIdx, setCurrIdx] = useState(0);
	const [candidate, setCandidate] = useState(['A', 'B', 'C']);
	const [result, setResult] = useState([]);
	const [availableChoices, setavailableChoices] = useState([]);

	const [counter, setCounter] = useState(configData.FIDELITY_TASK_TIME_LIMIT);
	
	useEffect(() => {
		if (counter > 0) {
			const timer = setTimeout(() => setCounter(counter - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [counter]);
	

	const getPermuteArray = (arr) => {
		for (let i = arr.length - 1; i >0; i--) {
			let iRand = Math.floor(Math.random() * (i + 1));
			let temp = arr[i];
			arr[i] = arr[iRand];
			arr[iRand] = temp;
		}
		return arr
	}

	useEffect(() => {
		const getQualityChallenges = () => {
		
			axios.get(`${configData.SERVER_URL}/api/v1/quality_challenges`)
			.then((res) => { 
				let challenges_list = []
				for (let id in res.data.data) {
					const item = Object.assign({"ID": id}, res.data.data[id]);
					challenges_list.push(item);
				}
				setChallenges(getPermuteArray(challenges_list));
				setavailableChoices(getPermuteArray(["IN", "TIN", "KIN"]));
				setFlag(true);
			})
			.catch((error) => { 
				setFlag(false);
				console.error(error);
			});
		};
		
		getQualityChallenges();
	},[]);

	const verifySelection = (result) => {
		if (result.length !== 3) return false
		return true
	}
	
	const resetResult = () => {
		setCandidate(['A', 'B', 'C']);
		setResult([]);
		setCounter(configData.FIDELITY_TASK_TIME_LIMIT);
	}

	const handleButtonOnClick = () => {
		console.log(availableChoices);
		console.log(result);
		if (verifySelection(result)) {
			axios.post(`${configData.SERVER_URL}/api/v1/record`,{
				account: account,
				task: task,
				challengeID: challenges[currIdx]["ID"],
				availableChoices: availableChoices,
				choices: result
			})
			.then( (response) => {
				console.log(response)
				resetResult();
				setCurrIdx(currIdx + 1);
				setavailableChoices(getPermuteArray(["IN", "TIN", "KIN"]));
			})
			.catch( (error) => {
				console.log(error)
				swal({
					title: "Error",
					text: "Submission failure",
					icon: "error",
				});
			})
			
		}
		else {
			swal({
				title: "Error",
				text: "Please rank all the candidates",
				icon: "error",
			});
		}
	}
	
	const handleHomeButtonOnClick = () => {
		setTask("none");
		setAccount("default");
	}
	
	const handleFidelityTaskButtonOnClick = () => {
		setTask("FidelityTask");
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
							<ImageWrapper url={rootImageURL+challenges[currIdx][availableChoices[0]]}/>
							A
						</div>
						<div className="flex-container-col">
							<ImageWrapper url={rootImageURL+challenges[currIdx][availableChoices[1]]}/>
							B
						</div>
						<div className="flex-container-col">
							<ImageWrapper url={rootImageURL+challenges[currIdx][availableChoices[2]]}/>
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
			<p>{(flag && currIdx !== challenges.length) ? "[" + (currIdx + 1) + " / "+ challenges.length + "]" : ""} Rank the candidates according to their qualites</p>
			<p>{(flag && currIdx !== challenges.length) ? "Countdown: " + counter : ""}</p>
			{(flag) ? (
					(currIdx === challenges.length) ? (
						<>
							<p>Thank you for your participation</p>
							<ButtonGroup disableElevation variant="contained" color="primary">
							<Button variant="contained" color="primary" onClick={handleHomeButtonOnClick}>
							Home</Button>
							<Button  variant="contained" color="secondary" onClick={handleFidelityTaskButtonOnClick}>
							Fidelity Task</Button>
							</ButtonGroup>
						</>
					) : (
						renderChallenge()
					)
				) : (
					<p>loading</p>
			)}
		</>
	)
}

export default QualityTask