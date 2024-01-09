const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const multer = require('multer')
const getJson = () => {
	const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = getJson();
		res.render('products', products)
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params
		const products = getJson();
		const product = products.find( (product) => product.id == id)
		res.render('detail', {title: product.name, product, toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		console.log(req.body)
		const {name, description, price, discount, image, category} = req.body;
		const products = getJson();
		const id = products[products.length-1].id+1;
		const productNew = {
			id: +id,
			name,
			description,
			price: +price,
			discount,
			image: image? image : 'default-image.png',
			category
		};
		products.push(products,productNew);
		const json = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, json, 'utf-8'); 
        res.redirect(`/products/detail/${id}`);
	},

	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params;
		const products = getJson();
		const product = products.find( product => product.id == id)
		res.render('product-edit-form', { product, toThousand})
	},
	// Update - Method to update
    update: (req, res) => {
        const { id } = req.params;
        const { name, price, discount, category, description } = req.body;
        const products = getJson();
		const file = req.file

        const nuevoArray = products.map(product => {
            if (product.id == id) {
                return {
                    id,
                    name: name.trim(),
                    price,
                    discount,
                    category,
                    description: description.trim(),
                    image: file ? filename : product.image
                };
            }
            return product;
        });

        const json = JSON.stringify(nuevoArray);
        fs.writeFileSync(productsFilePath, json, 'utf-8'); 
        res.redirect(`/products/detail/${id}`);
    },

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		const {id} = req.params;
		const products = getJson();
		const product = products.filter(product => product.id !== +id);

		const productClear = products.filter(product => product.id !== +req.params.id);
		const json = JSON.stringify(productClear)
		fs.unlink(`./public/images/products/${product.image}`, (err) => {
			if (err) throw err;
			console.log('archivo borrado')
		})
		fs.writeFileSync(productsFilePath, json, 'utf-8');
		return res.redirect('/products/')
	}
};

module.exports = controller;