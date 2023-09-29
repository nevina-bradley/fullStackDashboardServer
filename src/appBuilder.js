const express = require("express");
const cors = require("cors");

const appBuilder = (dbConnection) => {
    const app = express();

    app.use(express.json()); 
    app.use(cors());

    app.post("/", async (req, res) => {
        const {name, personality} = req.body;

        if(!name || !personality) {
            return res.status(400).send({
                status: "error",
                message: "Required fields are missing"
            })

    
        }
    

        try {
            const id = await dbConnection.askFavorite(name, personality);
            res.status(201).send({
                status: 'created',
                data: {
                    id: id,
                    name: name,
                    personality: personality
                }
            });

        } catch(err) {
            res.status(500).send({
                status: 'error',
                message: 'database connection failed'
            })
        }
    })

    app.get("/", async (req, res) => {
        try {
        
            const table = await dbConnection.getFavorite();
            
            res.status(200).send({
                status: 'created',
                data: table
            });
            console.log(table);
            return table;
        

        } catch(err) {
            res.status(500).send({
                status: 'error',
                message: 'database connection failed'
            })
        }

    }
    )
   
    
    return app;
}

module.exports = appBuilder;