const tasks = (arr) => arr.join(' && ');

module.exports = {
	hooks: {
		'pre-commit': tasks(['npm run lint']),
		'pre-push': tasks(['npm run test']),
		'commit-msg': 'commitlint -e $HUSKY_GIT_PARAMS',
	},
};
