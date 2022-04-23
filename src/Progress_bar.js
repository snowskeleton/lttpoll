import React from 'react'

const ProgressBar = ({progress}) => {

	const Parentdiv = {
		height: 45,
		width: '80%',
		backgroundColor: 'whitesmoke',
		borderRadius: 10,
		margin: 50
	}

	const Childdiv = {
		height: 45,
		width: `${progress}%`,
		backgroundColor: 'green',
		borderRadius: 10,
		// textAlign: 'right'
	}

	const progresstext = {
		padding: 10,
		color: 'black',
		fontWeight: 900,
		textAlign: 'center'
	}

	return (
	<div style={Parentdiv}>
	<div style={Childdiv}>
		<span style={progresstext}>{`${progress}%`}</span>
	</div>
	</div>
	)
}

export default ProgressBar;
