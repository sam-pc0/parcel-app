import React from 'react'
const QuickOverview = () => {
	return(
		<div className='quickOverview-container'>
			<div className='q-info-container'>
				<h1>You don't need more that one command</h1>	
				<p className='q-information'>Code bro, just code. Parcel and Parcel App will create everything for you
				 How create an <b>application?</b></p>
				<p className='npx'>npx parcel-app app-name</p>	
			</div>		
			<div className='gif'>
				<img src="https://j.gifs.com/xn9P3z.gif"/>
			</div>
		</div>
	)
};
export default QuickOverview