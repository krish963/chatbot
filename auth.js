const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const users = [
    {sapCode:"87654320", password:"password@1"},
    {sapCode:"87654321", password:"password@2"},
    {sapCode:"87654322", password:"password@3"},
    {sapCode:"87654323", password:"password@4"},
    {sapCode:"87654324", password:"password@5"}
];

app.post("/webhook", (req, res) => {
    const parameters = req.body.queryResult.parameters;
    const sapCode = parameters.sapCode || null;
    const password = parameters.password || null;

    const user = users.find((u) => 
        u.sapCode === sapCode &&
        u.password === password
    );

    if (user) {
        res.status(200).json({
            fulfillmentText: 'Login Successful!' 
        });
    } else{
        res.status(422).json({
            fulfillmentText: 'Invalid Credentials. Please try again!' 
        });
    }
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`webhook server is running on port ${PORT}`);
});