module.exports = {
	'root': true,
	'env': {
		es6: true,
		node: true,
		browser: true,
		jquery: false
	},
	'extends': [
		'eslint:recommended',
	],
	'parserOptions': {
		'ecmaVersion': 13,
		'sourceType': 'module',
	},
	'rules': {
		'indent': [
			'error',
			'tab',
			{'SwitchCase': 1}
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'require-atomic-updates': 'off',
		'no-use-before-define': [
			'error',
			{ 'functions': false, 'classes': false }
		],
		'no-multi-spaces': [ 'error' ],
		'array-callback-return': [ 'error' ],
		'block-scoped-var': [ 'error' ],
		'curly': [ 'error' ],
		'no-throw-literal': [ 'error' ],
		'guard-for-in': [ 'error' ],
		'no-extend-native': [ 'error' ],

		'eqeqeq': ['error', 'always'],
		'no-extra-boolean-cast': ['off'],
		'no-console': ['off'],
		'no-useless-escape': ['off'],

	}
};
