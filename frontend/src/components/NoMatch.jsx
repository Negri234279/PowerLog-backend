import { Container } from '@mui/material'
import { Link } from 'react-router-dom'

const NoMatch = () => {
	return (
        <Container sx={{ mt: 3 }}>
            <center>
                <div className="noMatch">
                    <img
                        src="https://c.tenor.com/IHdlTRsmcS4AAAAC/404.gif"
                        alt="404"
                        style={{ width: '300px' }}
                    ></img>
                    <br />
                    <img
                        src="https://c.tenor.com/apaLlyjoPuYAAAAj/dinkdonk-emote.gif"
                        alt="404"
                    ></img>
                </div>
                <br />
                <div className="noMatch">
                    <Link to="/"> Go to the home page </Link>
                </div>
            </center>
        </Container>
    )
}

export default NoMatch