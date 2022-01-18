const { response } = require('express');
const res = require('express/lib/response');
const {OAuth2Client} = require('google-auth-library');
const User = require('../models/Users');

const client = new OAuth2Client("/*client_id*/");

const loginUser = async (req, res) =>{
    const {tokenId} = req.body;

    let newUser = false; 

    client.verifyIdToken({idToken: tokenId, audience: "/*client_id*/"}).then(response => {
        const {email_verified, name, email, picture} = response.payload;

        if(email_verified){
            const user = Users.findOne({
                Name: name,
                email_id: email
            });

            if(user){
                return res.json({
                    user: user,
                    newUser: newUser
                });
            }
            else {
                newUser = true;

                const user = Users.create({
                    Name: name,
                    email_id: email,
                    Profile_Photo: picture,
                }); 

                return res.json({
                    user: user,
                    newUser: newUser
                });
            }
        }
        else{
            return res.status(401).json({
                message: 'email is not verified'
            });
        }        
    })
}

module.exports = {loginUser};