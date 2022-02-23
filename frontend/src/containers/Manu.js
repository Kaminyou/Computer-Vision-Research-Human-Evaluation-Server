import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import React, { useState } from "react";
import swal from "sweetalert";

function Manu({ task, setAccount, setTask }) {

	const [input, setInput] = useState("");
	const [selectedBtn, setSelectedBtn] = React.useState("");

	const verifyAccount = (account) => {
		if (account.length === 0) return false;
		else return true;
	}

	const verifyTask = (task) => {
		if (task === "none") return false;
		else return true;
	}

	const handleSelectButtonOnClick = (task) => {
		setSelectedBtn(task)
		setTask(task)
	}

	const handleOnChange = (e) => {
		setInput(e.target.value)
	}
	
	const handleOnClick = () => {
		const isVerifiedAccount = verifyAccount(input)
		const isverifiedTask = verifyTask(task);
		if (isVerifiedAccount && isverifiedTask) {
			setAccount(input)
		}
		else if (!isVerifiedAccount){
			swal({
				title: "Error",
				text: "Account not exists",
				icon: "error",
			});
		}
		else if (!isverifiedTask){
			swal({
				title: "Error",
				text: "Please choose a task",
				icon: "error",
			});
		}	
	}

	return (
		<>	
			<p>Task</p>
			<ButtonGroup disableElevation variant="contained" color="primary">
				<Button color={selectedBtn === 'QualityTask' ? "secondary" : "default"} onClick={()=>handleSelectButtonOnClick('QualityTask')}>Quality Task</Button>
				<Button color={selectedBtn === 'FidelityTask' ? "secondary" : "default"} onClick={()=>handleSelectButtonOnClick('FidelityTask')}>Fidelity Task</Button>
			</ButtonGroup>
			<p>Please enter your account</p>
			<div className="flex-container">
				<TextField
					required
					id="outlined-required"
					label="Required"
					onChange={handleOnChange}
				/>
				<Button 
					variant="contained" 
					color="secondary"
					onClick={handleOnClick}>
					Login
				</Button>
			</div>

		</>
	)
}

export default Manu