import React, { useState } from "react";
import './App.css';
import FidelityTask from "./containers/FidelityTask";
import Manu from "./containers/Manu";
import QualityTask from "./containers/QualityTask";


function App() {
	
	const [account, setAccount] = useState("default");
    const [task, setTask] = useState("none");

	const renderTask = (task) => {
		if (task === "QualityTask") {
			return <QualityTask account={account} task={task} setAccount={setAccount} setTask={setTask}/>
		} else if (task === "FidelityTask") {
			return <FidelityTask  account={account} task={task} setAccount={setAccount} setTask={setTask}/>
		} else {
			return <p> ERROR </p>
		}
	}
  
	return (
		<div className="App">
			<header className="App-header">
				<h1>Human evaluation server</h1>
				{(account === "default") ? (
					<Manu task={task} setAccount={setAccount} setTask={setTask}/>
				) : (
					renderTask(task)
				)}
			</header>
		</div>
	);
}

export default App;
