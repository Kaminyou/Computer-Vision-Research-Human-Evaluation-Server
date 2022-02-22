import React, { useState } from "react";
import './App.css';
import ChooseBestTask from "./containers/ChooseBestTask";
import IsRealTask from "./containers/IsRealTask";
import Manu from "./containers/Manu";

function App() {
	
	const [account, setAccount] = useState("default");
    const [task, setTask] = useState("none");

	const renderTask = (task) => {
		if (task === "chooseBest") {
			return <ChooseBestTask account={account} task={task}/>
		} else if (task === "isReal") {
			return <IsRealTask />
		} else {
			return <p> ERROR </p>
		}
	}
  
	return (
		<div className="App">
			<header className="App-header">
				<h1>Human evaluation server</h1>
				{(account === "default") ? (
					<Manu account={account} task={task} setAccount={setAccount} setTask={setTask}/>
				) : (
					renderTask(task)
				)}
				{/*
				
				<img className="photo"
					src="http://10.1.0.41:9292/images/IMG_6279.jpg"
					alt="new"
				/>
				<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
				>
				Learn React
				</a>
				*/}
			</header>
		</div>
	);
}

export default App;
