const express = require('express');
const bodyParser = require ('body-parser');
const exphbs = require ('express-handlebars');
const { Shop , Coffee } = require ('./models');
const path = require ('path')

const app = express();

app.use ( bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use ( express.static ( path.join ( __dirname, 'public' ) ) ); 

app.engine ( 'handlebars', exphbs({defaultLayout:'main'}) )
app.set ( 'view engine','handlebars' )
// Shop.create ({ name:'Starbucks' }).then ( shop => {
//     shop.createCoffee ({ name:'Columbian', type:'Dark'}).then( ()=>console.log('Worked') );
// });

// Shop.findAll({
//     include: [Coffee]
// }).then ( shops => console.log (shops) )

app.get( '/', (req,res) => {
    Shop.findAll({ 
        include: [Coffee] 
    }).then ( shops => res.render ('index', { shops }) );
});

app.post( '/shops', (req,res) => {
    Shop.create( req.body ).then ( res.redirect('/'));
});

app.post ('/coffee/:shop_id', (req, res)=>{
    Coffee.create ({
        ...req.body, shopId: req.params.shop_id
    }).then ( () => res.redirect('/'));
});


app.listen( 5000, ()=> console.log ( 'Listening on port 5000' ));
