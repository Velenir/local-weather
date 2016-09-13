const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');

const validate = require('webpack-validator');

const parts = require('./libs/parts');

const stylelint = require('stylelint');


const PATHS = {
	app: path.join(__dirname, 'app'),
	style: path.join(__dirname, 'app', 'main.css'),
	build: path.join(__dirname, 'build')
};


const common = {
	module: {
		// preLoaders are executed before loaders, postLoaders -- after
		preLoaders: [
			{
				test: /\.jsx?$/,
				loaders: ['eslint'],
				include: PATHS.app
			},
			{
				test: /\.css$/,
				loaders: ['postcss'],
				include: PATHS.app
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				// Enable caching for improved performance during development
				// It uses default OS directory by default. If you need
				// something more custom, pass a path to it.
				// I.e., babel?cacheDirectory=<path>
				loaders: ['babel?cacheDirectory'],
				// Parse only app files! Without this it will go through
				// the entire project. In addition to being slow,
				// that will most likely result in an error.
				include: PATHS.app
			}
		]
	},
	postcss: function () {
		return [
			stylelint({
				configFile: '.stylelintrc'
			})
		];
	},

	// Entry accepts a path or an object of entries.
	// We'll be using the latter form given it's
	// convenient with more complex configurations.
	entry: {
		style: PATHS.style,
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: 'js/[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Local Weather'
		})
	],

	// Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};


let config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
case 'build':
case 'stats':
	config = merge(
		common,
		{
			devtool: 'source-map',
			output: {
				path: PATHS.build,
				// Tweak this to match your GitHub project name
				publicPath: '/webpack-demo/',
				filename: 'js/[name].[chunkhash].js',
				// This is used for require.ensure. The setup
				// will work without but this is useful to set.
				chunkFilename: '[chunkhash].js'
			}
		},

		parts.clean(PATHS.build),

		// NODE_ENV = 'production' allows for many react and uglify optimisations
		parts.setFreeVariable(
			'process.env.NODE_ENV',
			'production'
		),

		parts.extractBundle({
			name: 'vendor',
			entries: ['react']
		}),
		parts.minify(),
		parts.extractCSS(PATHS.style),
		parts.deduplicate()
	);
	break;
default:
	config = merge(
		common,
		{
			devtool: 'eval-source-map'
		},

		parts.setupCSS(PATHS.style),
		parts.devServer({
			// Customize host/port here if needed
			host: process.env.HOST,
			port: process.env.PORT
		})
	);
}

// Run validator in quiet mode to avoid output in stats
module.exports = validate(config, {
	quiet: true
});
