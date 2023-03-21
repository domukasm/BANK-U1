const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { celebrate } = require('celebrate');
const Joi = require('joi');
const { v4: uuid } = require('uuid');
const md5 = require('md5');
const { readFile, writeFile } = require('fs').promises;

const app = express();
const PORT = 3003;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
  
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.json());

app.get("/users", async (req, res) => {
    let allData = await readFile("./data/users.json", "utf8");
    allData = JSON.parse(allData);
    res.json(allData);
});

app.post("/users", async (req, res) => {
    let allData = await readFile("./data/users.json", "utf8");
    allData = JSON.parse(allData);
    const id = uuid();
    const data = {
        id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        balance: req.body.balance,
    };
    allData.push(data);
    allData = JSON.stringify(allData);
    writeFile("./data/users.json", allData, "utf8");
    res.status(201).send(allData);
});
app.delete("/users/:id", async (req, res) => {
    let allData = await readFile("./data/users.json", "utf8");
    allData = JSON.parse(allData);
    console.log(allData);
    let deletedData = allData.filter((d) => req.params.id !== d.id);
    deletedData = JSON.stringify(deletedData);
    console.log(deletedData);
    await writeFile("./data/users.json", deletedData, "utf8");
    res.status(200).send(deletedData);
});
app.patch("/users/:id/balance", async ( req, res) => {
    const userId = (req.params.id);
    console.log(userId);
    const amount = parseInt(req.body.balance);
    // read the JSON file
    const data = await readFile("./data/users.json", "utf8");
    const users = JSON.parse(data);
    console.log(users);

    // find the user with the matching ID
    const user = users.find((u) => u.id === userId);
    console.log(user);

    // if user is not found, return an error
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    // update the user's balance
    user.balance += amount;

    // write the updated data back to the JSON file
    writeFile("./data/users.json", JSON.stringify(users, null, 2));

    // return the updated user data
    res.status(200).send(users);;
});

// set cookie

app.post('/login', async (req, res) => {
    try {
        const accounts = await readFile('./data/accounts.json', 'utf8');
        const name = req.body.name;
        const password = md5(req.body.password);
        console.log(name, password)
        const user = JSON.parse(accounts).find(
            (user) => user.name === name && user.password === password
        );
        if (user) {
            const tokenID = md5(uuid());
            const updatedAccounts = JSON.parse(accounts).map((user) => {
                if (user.name === name && user.password === password) {
                    return { ...user, token: tokenID };
                }
                return { ...user };
            });

            await writeFile('./data/accounts.json', JSON.stringify(updatedAccounts));

            res.cookie('bankSession', tokenID, {
                sameSite: 'None',
                secure: true,
                httpOnly: true,
            });
            res.status(200).send({
                message: 'Login success',
                name: user.name
            });
        } else {
            res.status(401).send({ message: 'Login failed' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// get cookie

app.get('/login', async (req, res) => {
    try {
        const accounts = await readFile('./data/accounts.json', 'utf8');
        const token = req.cookies.bankSession;
        const user = JSON.parse(accounts).find((user) => user.token === token);

        if (user) {
            res.status(200).send({
                message: 'Login success',
                name: user.name
            });
        } else {
            res.status(401).send({ message: 'Login failed' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Logout

app.post('/logout', async (req, res) => {
    try {
        const accounts = await readFile('./data/accounts.json', 'utf8');
        const token = req.cookies.bankSession;
        const updatedAccounts = JSON.parse(accounts).map((user) => {
            if (user.token === token) {
                return { ...user, token: null };
            }
            return { ...user };
        });

        await writeFile('./data/accounts.json', JSON.stringify(updatedAccounts));
        res.clearCookie('bankSession', {
            sameSite: 'None',
            secure: true,
            httpOnly: true,
        });
        res.status(200).send({ message: 'Logout success' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});