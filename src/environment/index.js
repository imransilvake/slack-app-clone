// app
import development from './development';
import staging from './staging';
import production from './production';

function ENV() {
	switch (process.env.REACT_APP_ENV) {
		case 'staging':
			return staging;
		case 'production':
			return production;
		default:
			return development;
	}
}

export default ENV();
