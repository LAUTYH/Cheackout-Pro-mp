import express from "express"
import cors from "cors"

import { MercadoPagoConfig, Preference } from "mercadopago"

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
})

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Soy el server ;)")
})

app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://docs.google.com/document/d/1ozzf1l8ZrH4eEKQfz83uAhs1FsCcwrtNUTDzxiVCJFs/edit",
                failure: "https://docs.google.com/document/d/1ozzf1l8ZrH4eEKQfz83uAhs1FsCcwrtNUTDzxiVCJFs/edit",
                pending: "https://docs.google.com/document/d/1ozzf1l8ZrH4eEKQfz83uAhs1FsCcwrtNUTDzxiVCJFs/edit",
            },
            auto_return: "approved"
        }

        const preference = new Preference(client);
        const result = await preference.create({ body })
        res.json({
            id: result.id
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear"
        })

    }
})

app.listen(PORT, () => {
    console.log(`El servidor corriendo en el puerto: ${PORT}`);
    
})