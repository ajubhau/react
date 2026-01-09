const fs = require('node:fs/promises');

async function userLogin(user) {
    const rawFileContent = await fs.readFile('users.json', {encoding: 'utf-8'});
    const data = JSON.parse(rawFileContent);
    const loginUser = data.users ?? [];
    return loginUser;
}

async function userSignup(user) {
    const rawFileContent = await fs.writeFile('users.json', JSON.stringify({users: user || [] }));
    return rawFileContent;
}

exports.userLogin = userLogin;
exports.userSignup = userSignup;