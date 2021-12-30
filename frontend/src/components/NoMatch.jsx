import { Link } from 'react-router-dom'

const NoMatch = () => {
	return (
		<div>
			<div className='noMatch'>
				<img
					src='https://sitethemedata.com/pages/404/img/icon-404.svg'
					alt='404'>
				</img>
			</div>
			<div className='noMatch'>
				<Link to='/'> Go to the home page </Link>
			</div>
		</div>
	)
}

export default NoMatch