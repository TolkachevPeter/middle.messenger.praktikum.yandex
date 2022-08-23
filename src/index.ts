// import router from './router';

// router;

import { generateChatPage } from './pages/chats';
// import { generateErrorPage } from '../pages/errors';
import {generateLoginModule} from './pages/login';
import { generateRegistrationModule } from './pages/registration';
import { generateUserPage } from './pages/user';
import Router from './services/router';


const router = new Router('.chat');

router
	.use('/', new generateLoginModule())
	.use('/sign-up', new generateRegistrationModule())
	.use('/settings', new generateUserPage())
	.use('/messenger', new generateChatPage())
//   .use('/404', new generateErrorPage(404, 'Sorry, but this page does not exist'))
//   .use('/500', new generateErrorPage(500, 'We are working to fix the problem!'))
	.start();
