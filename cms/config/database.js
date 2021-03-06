const productionConfig = ({ env }) => {
	const dbUriParse = require('pg-connection-string').parse;
	const dbConfig = dbUriParse(env('DATABASE_URL'));

	return {
		defaultConnection: 'default',
		connections: {
			default: {
				connector: 'bookshelf',
				settings: {
					client: 'postgres',
					database: dbConfig.database,
					host: dbConfig.host,
					port: dbConfig.port,
					username: dbConfig.user,
					password: dbConfig.password,
					ssl: {
						rejectUnauthorized: false,
					},
				},
				options: {
					ssl: true,
				},
			},
		},
	};
};

const fastConfig = () => ({
	defaultConnection: 'default',
	connections: {
		default: {
			connector: 'bookshelf',
			settings: {
				client: 'sqlite',
				filename: '.tmp/data.db',
			},
			options: {
				useNullAsDefault: true,
			},
		},
	},
});

const testingConfig = () => ({
	defaultConnection: 'default',
	connections: {
		default: {
			connector: 'bookshelf',
			settings: {
				client: 'sqlite',
				filename: '.tmp/test.db',
			},
			options: {
				useNullAsDefault: true,
				pool: {
					min: 0,
					max: 1,
				},
			},
		},
	},
});

const config =
	process.env.FAST === 'TRUE'
		? fastConfig
		: process.env.TESTING === 'TRUE'
		? testingConfig
		: productionConfig;

module.exports = config;
