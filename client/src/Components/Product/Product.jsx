import React, { useState } from 'react';
import styles from './Product.module.css'; 
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';


const Product = () => {

    const [preferenceId, setPreferenceId] = useState(null)

    initMercadoPago(process.env.MP_PUBLIC_KEY, {
        locale: "es-AR"
    }); // Clave pública de mercadp pago en este caso

    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:3000/create_preference", {
                title: "Iphone 13 pro max 256gb",
                quantity: 1,
                price: 890
            })

            const { id } = response.data;
            return id
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleBuy = async () => {
        const id = await createPreference()
        if (id) {
            setPreferenceId(id)
        }
    }
    return (
        <div className={styles['card-product-container']}>
            <div className={styles['card-product']}>
                <div>
                    <img src="https://http2.mlstatic.com/D_NQ_NP_736168-MLA47781742030_102021-O.webp" alt="Iphone 13 pro max" />
                </div>
                <div>
                    <h3 className={styles['title-product']}>Iphone 13 pro max 256gb</h3>
                    <div className={styles['compra-sistems']}> {/* Asegúrate de que la clase coincide */}
                        <h2 className={styles['price-product']}>890$</h2>
                        <button className={styles['button-product']} onClick={handleBuy}>Comprar</button>
                        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
