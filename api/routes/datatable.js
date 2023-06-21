import express from 'express';
import { db } from '../db.js';


const router = express.Router();

router.get("/datatable", (req, res) => {

    try {
        const q = "SELECT * FROM why.`demo.csv`";

        db.query(q, (err, data)=>{
            if (err) {
               res.status(500).json({message: "Error"}) 
            } res.json(data);
        })
    } catch (error) {
        res.json({message: `Error: ${error}`})
    }
   
});

export default router;