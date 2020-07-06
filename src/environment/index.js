// app
import development from './development';
import next from './next';
import production from './production';

const ENV = () => {
	switch (process.env.REACT_APP_ENV) {
		case 'next':
			return next;
		case 'production':
			return production;
		default:
			return development;
	}
};

export default ENV();
