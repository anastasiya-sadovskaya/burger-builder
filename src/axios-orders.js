import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder555.firebaseio.com/'
});

export default instance;