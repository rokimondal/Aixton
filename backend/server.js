import http from 'http'
import 'dotenv/config.js'
import app from './app.js';
const PORT = process.env.PORT || 3000;


const server = http.createServer(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})