import { generateChatPage } from './pages/chats';
import { generateErrorPage } from './pages/errors';
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
	.use('/404', new generateErrorPage({code: 404, description: 'Sorry, but this page does not exist'}))
	.use('/500', new generateErrorPage({code: 500, description: 'We are working to fix the problem!'}))
	.start();
