import React from 'react'
import Skill from './ParselSkills'
import QuickOverview from './QuickOverview'
const Intro = () => {
	return(
		<div className='body-f-style'>
			<div className='body-style'>
				<h1>Parcel ✈</h1>
				<p>With Parcel you can enable multicore compilation, this allows you to work faster also 
				 has a filesystem cache for fast rebuilds even after a restart.</p>
			</div> 
			<div className='parsel-skills'>
			 	<Skill skill="Blazing fast bundle times" def='Parcel uses worker processes to enable multicore compilation, and has a filesystem cache for fast rebuilds even after a restart.'/>
			 	<Skill skill="Bundle all your assets" def='Parcel has out of the box support for JS, CSS, HTML, file assets, and more - no plugins needed.'/>
				<Skill skill="Automatic transforms" def='Code is automatically transformed using Babel, PostCSS, and PostHTML when needed - even node_modules.'/>
				<Skill skill="Zero config code splitting" def='Using the dynamic import() syntax, Parcel splits your output bundles so you only load what is needed on initial load.'/>
				<Skill skill="Hot module replacement" def='Parcel automatically updates modules in the browser as you make changes during development, no configuration needed.'/>
				<Skill skill="Friendly error logging" def='Parcel prints syntax highlighted code frames when it encounters errors to help you pinpoint the problem.'/>
			</div>
			<div className='extra-info'>
				<a href='https://parceljs.org/getting_started.html' target='_blank'>Ey body, I want to say you that this information was taked from the Parcel website, I'll leave you the dococumentation here 😃</a>
			</div>
			<div className='body-style'>
				<h1>How start?</h1>
				<p>Sometimes you just want to create a fast project, that's reaso because we create a simple command
				line.</p>
			</div>
			<QuickOverview/> 
		</div>
	)
};
export default Intro