import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import ImageWrapper from '../components/ImageWrapper';
import configData from "../config.json";


function FidelityTask({ account, task, setAccount, setTask}) {
	const rootImageURL = `${configData.SERVER_URL}/api/v1/images/`
	const [challenges, setChallenges] = useState([]);
	const [flag, setFlag] = useState(false);
	const [currIdx, setCurrIdx] = useState(0);
	const [selectedBtn, setSelectedBtn] = useState("");
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

	const resetResult = () => {
		setSelectedBtn("");
		setResult([]);
		setCounter(configData.FIDELITY_TASK_TIME_LIMIT);
	}


	useEffect(() => {
		const getFidelityChallenges = () => {
		
			axios.get(`${configData.SERVER_URL}/api/v1/fidelity_challenges`)
			.then((res) => { 
				let challenges_list = []
				for (let id in res.data.data) {
					const item = Object.assign({"ID": id}, res.data.data[id]);
					challenges_list.push(item);
				}
				setChallenges(getPermuteArray(challenges_list));
				setavailableChoices(getPermuteArray(["REAL", "FAKE"]));
				setFlag(true);
			})
			.catch((error) => { 
				setFlag(false);
				console.error(error);
			});
		};
		
		getFidelityChallenges();
	},[]);

	const verifySelection = (result) => {
		if (result.length === 1) {
			if ((result[0] === "REAL") || (result[0] === "FAKE")) return true
		}
		return false
	}

	const handleHomeButtonOnClick = () => {
		setTask("none");
		setAccount("default");
	}

	const handleQualityTaskButtonOnClick = () => {
		setTask("QualityTask");
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
				setavailableChoices(getPermuteArray(["REAL", "FAKE"]));
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
				text: "Please choose the most real candidate",
				icon: "error",
			});
		}		
	}

	const handleSelectButtonOnClick = (option) => {
		setSelectedBtn(option)
		if (option === 'A') {
			setResult([availableChoices[0]])
		}
		else if (option === 'B') {
			setResult([availableChoices[1]])
		}
	}
	
	const renderChallenge = () => {
		return (
			<>
			<div className="flex-container">
				<div className="flex-container-col">
					<ImageWrapper url={rootImageURL+challenges[currIdx][availableChoices[0]]} maxWidth={'550px'}/>
					A
				</div>
				<div className="flex-container-col">
					<ImageWrapper url={rootImageURL+challenges[currIdx][availableChoices[1]]} maxWidth={'550px'}/>
					B
				</div>
			</div>
			<div className="flex-container">
				<ButtonGroup disableElevation variant="contained" color="primary">
					<Button color={selectedBtn === 'A' ? "secondary" : "default"} onClick={()=>handleSelectButtonOnClick('A')}>A</Button>
					<Button color={selectedBtn === 'B' ? "secondary" : "default"} onClick={()=>handleSelectButtonOnClick('B')}>B</Button>
				</ButtonGroup>
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
			<p>{(flag && currIdx !== challenges.length) ? "[" + (currIdx + 1) + " / "+ challenges.length + "]" : ""} Choose the real candidate</p>
			<p>{(flag && currIdx !== challenges.length) ? "Countdown: " + counter : ""}</p>
			{(flag) ? (
					(currIdx === challenges.length) ? (
						<>
							<p>Thank you for your participation</p>
							<ButtonGroup disableElevation variant="contained" color="primary">
							<Button variant="contained" color="primary" onClick={handleHomeButtonOnClick}>
							Home</Button>
							<Button  variant="contained" color="secondary" onClick={handleQualityTaskButtonOnClick}>
							Quality Task</Button>
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

export default FidelityTask