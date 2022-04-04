
middleware = require('../middleware/response.filter')
const router = require('express').Router()
const Item = require('../models/Item')

const TAMANHO_MAXIMO_LISTAGEM = 4;

//busca detalhe do item por id  
router.get('/:id', middleware.bodyAuthorAppender,  async (req, res) => {
    try{
        const item = await Item.findById(req.params.id)
        if(!item){
            res.status(422).json({message: 'Nenhum item encontrado'});
            return
        }
        res.status(200).json(item)
    }catch(error){
        res.status(500).json({error})
    }
})



router.get('/', middleware.bodyAuthorCategoriesAppender, async (req, res) => {
    try{
        let items;
        if(Object.keys(req.query).length === 0){
            items = await Item.find()
        }else{
            items = await Item.find({"title": { "$regex": req.query.q, "$options": "i" }})
            console.log("LISTA COMPLETA", items);
            if(items.length > TAMANHO_MAXIMO_LISTAGEM){
                items = items.slice(0, TAMANHO_MAXIMO_LISTAGEM)
                console.log("LISTA FILTRADA", items);
            }
        }
        res.status(200).json(items)
    }catch(error){
        res.status(500).json({error})
    }
})


//criação do item
router.post('/', async (req, res) => {
    
    const {
        id,
        title,
        category,
        price: { 
            currency, 
            amount, 
            decimals, 
        }, 
        picture, 
        condition, 
        free_shipping, 
        sold_quantity,
        description, 
    } = req.body;

    const item = {
        id,
        title,
        category,
        price: { 
            currency, 
            amount, 
            decimals, 
        }, 
        picture, 
        condition, 
        free_shipping, 
        sold_quantity,
        description, 
    }

    try{
        await Item.create(item);
        res.status(201).json({message: 'Item cadastrado com sucesso!'});
    }catch(error){
        res.status(500).json({error})
    }
});


module.exports = router