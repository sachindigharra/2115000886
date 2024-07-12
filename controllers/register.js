const axios = require('axios');

const register = async () => {
    try {
        const response = await axios.post('http://20.244.56.144/test/register', {
            companyName: "goMart",
            ownerName: "Rahul",
            rollNo: "1",
            ownerEmail: "rahul@abc.edu",
            accessCode: "FKDLjg"
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

register();
