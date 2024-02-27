const express=require ('express')
const router=express.Router();

const items=[
    {
    id:1,
    name:'post 1',
    },

    {
        id:2,
        name:'post 2',
    },
    {
        id:3,
        name:'post 3',
        },
    ] 

    //routes 
    router.get('/all', (req,res)=>{
        res.send(items)
    })
        
    
    router.get('/:id', (req,res)=>{
        const itemId=parseInt (req.params.id);
        const item=items.find((x)=> x.id===itemId);
        if(item){
        res.send(item)
        }else {
            res.status(404).send("Post no found")
        }
    })

    router.delete('/:id', (req, res) => {
        const itemId = parseInt(req.params.id);
        const item = items.find(item => item.id === itemId);
    
        if (item) {
            const data = items.filter(item => item.id !== itemId);
            res.send(data);
        } else {
            res.status(404).send("Post not found");
        }
    });
    
    module.exports=router;
