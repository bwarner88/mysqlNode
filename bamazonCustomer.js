var mySQL = require('mysql');
var inquirer = require('inquirer');
var table = require('console.table');

var con = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307,
    database: "bamazon"
});

con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!");
    selectProduct();
});

var selectProduct = function () {
    con.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res)
    })
    selectProductID();
}

var selectProductID = function () {

    inquirer.prompt([
        {
            type: "input",
            name: "selectID",
            message: "What is the id of the product you would like to buy?"
        }
    ]).then(function (itemID) {
        con.query("SELECT * FROM products WHERE item_id = ?", [itemID.selectID], function (err, res) {
            console.table(res)
        });
        selectQty();
    });

}

var selectQty = function () {
    inquirer.prompt([
        {
            type: "input",
            name: "selectQuantity",
            message: "How many would you like to buy?"
        }
    ]).then(function (selection) {
        var quantity = parseInt(selection.selectQuantity)
        adjustTable(quantity);
    })
    
}


var adjustTable = function(quantity){
    con.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity.selectQuantity, itemID.findID], function (err, res) {
        if (err) throw err;
        console.table("SELECT * FROM products")
    })

}



// var selectProduct = function(){
// inquirer.prompt([
//     {
//         type: "list",
//         name: "selectDepartment",
//         message: "What is the department that you would like to shop in?",
//         choices: ["clothing", "electronics", "bath"]
//     }
// ]).then(function(selection){

//     con.query("SELECT item_id, product_name FROM products WHERE department_name = ?", [selection.selectDepartment], function(err, res){
//         if (err) throw err;
//         console.table(res)
//     })
//     selectProductID();

// });
// };













// con.query("SELECT * FROM products WHERE department_name = 'clothing'", function (err, res, fields){
//             if (err) throw err;
//             console.log(res)


//     else if(selection.selectDepartment === 'Electronics'){
//         con.query("SELECT * FROM products WHERE department_name = 'electronics'", function (err, res, fields){
//             if (err) throw err;
//             console.log(res)
//         })
//     }
//     else if(selection.selectDepartment === 'Bath'){
//         con.query("SELECT * FROM products WHERE department_name = 'bath'", function (err, res, fields){
//             if (err) throw err;
//             console.log(res)
//         })
//     }
// })