const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname, '../data/userDataBase.json');
const { validationResult } = require('express-validator');
const getJson = () => {
	const userFilePath = path.join(__dirname, '../data/userDataBase.json');
	const products = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
	return products;
}

const userController ={
    registro:(req, res) =>{
        res.render('registro', {tittle:'registro'})
    },
    register: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("registro", {errors:errors.mapped(), old:req.body})
            }
        }
}


module.exports = userController;