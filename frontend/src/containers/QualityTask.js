import Button from '@material-ui/core/Button';
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import ImageWrapper from '../components/ImageWrapper';
import TransferList from "../components/TransferList";
import configData from "../config.json";


function QualityTask({ account, task }) {

	const rootImageURL = `${configData.SERVER_URL}/api/v1/images/`
	const [challenges, setChallenges] = useState([]);
	const [flag, setFlag] = useState(false);
	const [currIdx, setCurrIdx] = useState(0);
	const [candidate, setCandidate] = useState(['A', 'B', 'C']);
	const [result, setResult] = useState([]);

	
	const getQualityChallenges = () => {
		
		axios.get(`${configData.SERVER_URL}/api/v1/quality_challenges`)
		.then((res) => { 
            let challenges_list = []
			for (let id in res.data.data) {
				const item = Object.assign({"ID": id}, res.data.data[id]);
				challenges_list.push(item);
			}
			setChallenges(challenges_list);
			setFlag(true);
		})
        .catch((error) => { 
            setFlag(false);
            console.error(error);
        });
	};

	useEffect(() => {
		getQualityChallenges();
	},[]);


	const verifySelection = (result) => {
		if (result.length !== 3) return false
		return true
	}
	
	const resetResult = () => {
		setCandidate(['A', 'B', 'C']);
		setResult([])
	}

	const handleButtonOnClick = () => {
		console.log(result);
		if (verifySelection(result)) {
			axios.post('http://10.1.0.41:9292/api/v1/record',{
				account: account,
				task: task,
				challengeID: challenges[currIdx]["ID"],
				choice: result
			})
			.then( (response) => {
				console.log(response)
				resetResult();
				setCurrIdx(currIdx + 1)
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
			<p>{(flag && currIdx !== challenges.length) ? "[" + (currIdx + 1) + " / "+ challenges.length + "]" : ""} Rank the candidates according to their qualites</p>
			{(flag) ? (
					(currIdx === challenges.length) ? (
						<p>Thank you for your participation</p>
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