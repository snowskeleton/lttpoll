import React from 'react'

const ProgressBar = ({bgcolor,progress,height}) => {

	const Parentdiv = {
		height: height,
		width: '100%',
		backgroundColor: 'whitesmoke',
		borderRadius: 40,
		margin: 50
	}

	const Childdiv = {
		height: '100%',
		width: `${progress}%`,
		backgroundColor: bgcolor,
	borderRadius:40,
		textAlign: 'right'
	}

	const progresstext = {
		padding: 10,
		color: 'black',
		fontWeight: 900
	}

	return (
	<div style={Parentdiv}>
	<div style={Childdiv}>
		<span style={progresstext}>{`${progress}%`}</span>
	</div>
	</div>
	)
// example, commented out.
        {/* <ProgressBar bgcolor={this.state.color} progress={this.state.progression} height={30} width={10} /> */}
}

export default ProgressBar;
