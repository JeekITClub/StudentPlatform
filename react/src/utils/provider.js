import axios from 'axios';

return axios.create({
    withCredentials: true,
    headers: {
        'X-CSRFToken': null,
    },
});