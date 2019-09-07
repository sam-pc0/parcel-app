import React from 'react'
const Skills = ({ skill, def }) => {
	return(
		<div className='skills'>
			<div className='skill-container'>
				<h1>{ skill }</h1>
				<p>{ def }</p>
			</div>
		</div>
	)
};
export default Skills