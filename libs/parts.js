const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.clean = function(path) {
	return {
		plugins: [
			new CleanWebpackPlugin([path], {
				// Without `root` CleanWebpackPlugin won't point to our
				// project and will fail to work.
				root: process.cwd()
			})
		]
	};
};

// for development
exports.devServer = function(options) {
	return {
		devServer: {
			// Enable history API fallback so HTML5 History API based
			// routing works. This is a good default that will come
			// in handy in more complicated setups.
			historyApiFallback: true,

			// Unlike the cli flag, this doesn't set
			// HotModuleReplacementPlugin!
			hot: true,
			inline: true,

			// Display only errors to reduce the amount of output.
			stats: 'errors-only',

			// Parse host and port from env to allow customization.
			//
			// If you use Vagrant or Cloud9, set
			// host: options.host || '0.0.0.0';
			//
			// 0.0.0.0 is available to all network devices
			// unlike default `localhost`.
			host: options.host, // Defaults to `localhost`
			port: options.port // Defaults to 8080
		},
		plugins: [
			// Enable multi-pass compilation for enhanced performance
			// in larger projects. Good default.
			new webpack.HotModuleReplacementPlugin({
				multiStep: true
			})
		]
	};
};

exports.indexTemplate = function(options) {
	return {
		plugins: [
			new HtmlWebpackPlugin(options)
		]
	};
};

// for development
exports.setupCSS = function(paths) {
	return {
		module: {
			loaders: [
				{
					test: /\.css$/,
					loaders: ['style', 'css', 'postcss'],
					include: paths
				},
				{
					test: /\.scss$/,
					loaders: ['style', 'css', 'postcss', 'sass'],
					include: paths
				}
			]
		}
	};
};

// for production
exports.extractCSS = function(paths) {
	return {
		module: {
			loaders: [
				// Extract CSS during build
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract('style', 'css!postcss'),
					include: paths
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
					include: paths
				}
			]
		},
		plugins: [
			// Output extracted CSS to a file
			new ExtractTextPlugin('css/[name].[chunkhash].css')
		]
	};
};

// for production
exports.minify = function() {
	return {
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		]
	};
};

exports.setFreeVariables = function(definitions) {
	const env = {};
	for(let key of Object.keys(definitions)) {
		env[key] = JSON.stringify(definitions[key]);
	}

	return {
		plugins: [
			new webpack.DefinePlugin(env)
		]
	};
};

// for production
exports.extractBundle = function(options) {
	const entry = {};
	entry[options.name] = options.entries;

	return {
		// Define an entry point needed for splitting.
		entry: entry,
		plugins: [
			// Extract bundle and manifest files. Manifest is
			// needed for reliable caching.
			new webpack.optimize.CommonsChunkPlugin({
				names: [options.name, 'manifest']
			})
		]
	};
};

// for production only
exports.deduplicate = function() {
	return {
		plugins: [
			new webpack.optimize.DedupePlugin()
		]
	};
};
