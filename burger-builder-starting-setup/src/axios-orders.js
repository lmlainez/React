import axios from 'axios';

const instance = axios.create({
	baseURL : "https://react-my-burger-843a0.firebaseio.com/"
});

export default instance;