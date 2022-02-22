import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import React, { useState } from "react";
import swal from "sweetalert";

function Manu({ setAccount, setTask }) {

	const [input, setInput] = useState("");
	const [selectedBtn, setSelectedBtn] = React.useState("");

	const verifyAccount = (account) => {
		if (account.length === 0) return false;
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
		if (verifyAccount(input)) {
			setAccount(input)
		}
		else {
			swal({
				title: "Error",
				text: "Account not exists",
				icon: "error",
			});
		}	
	}

	return (
		<>	
			<p>Task</p>
			<ButtonGroup disableElevation variant="contained" color="primary">
				<Button color={selectedBtn === 'chooseBest' ? "secondary" : "default"} onClick={()=>handleSelectButtonOnClick('chooseBest')}>Choose best</Button>
				<Button color={selectedBtn === 'isReal' ? "secondary" : "default"} onClick={()=>handleSelectButtonOnClick('isReal')}>Is real</Button>
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