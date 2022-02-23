import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useState } from "react";
import CustomList from './CustomList';


function TransferList({ left, right, setLeft, setRight }) {

	const not = (a, b) => {
		return a.filter((value) => b.indexOf(value) === -1);
	}
	
	const intersection = (a, b) => {
		return a.filter((value) => b.indexOf(value) !== -1);
	}
	
	const union = (a, b) => {
		return [...a, ...not(b, a)];
	}
	
	const [checked, setChecked] = useState([]);
	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
		newChecked.push(value);
		} else {
		newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
	if (numberOfChecked(items) === items.length) {
		setChecked(not(checked, items));
	} else {
		setChecked(union(checked, items));
	}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked).sort());
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked).sort());
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	
	return (
		<Grid container spacing={2} justifyContent="center" alignItems="center">
			<Grid item><CustomList title={'Choices'} items={left} checked={checked} numberOfChecked={numberOfChecked} handleToggle={handleToggle} handleToggleAll={handleToggleAll}/></Grid>
			<Grid item>
			<Grid container direction="column" alignItems="center">
				<Button
				sx={{ my: 0.5 }}
				variant="outlined"
				size="small"
				onClick={handleCheckedRight}
				disabled={leftChecked.length === 0}
				aria-label="move selected right"
				>
				&gt;
				</Button>
				<Button
				sx={{ my: 0.5 }}
				variant="outlined"
				size="small"
				onClick={handleCheckedLeft}
				disabled={rightChecked.length === 0}
				aria-label="move selected left"
				>
				&lt;
				</Button>
			</Grid>
			</Grid>
			<Grid item><CustomList title={'Ranked'} items={right} checked={checked} numberOfChecked={numberOfChecked} handleToggle={handleToggle} handleToggleAll={handleToggleAll}/></Grid>
		</Grid>
	);
}

export default TransferList