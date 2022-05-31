const express = require('express');
const PORT = process.env.CHAT_APP_PORT || 3000;
const app = express();


app.use(express.static(__dirname + '/dist'));

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}!`);
});
