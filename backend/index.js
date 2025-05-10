const express = require('express')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT;

app.use(cors())
app.use(bodyParser.json())

const ipLog = new Map()

app.post('/enviar', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (ipLog.has(ip) && Date.now() - ipLog.get(ip) < 24 * 60 * 60 * 1000) {
        return res.status(429).json({ mensaje: 'Tienes que esperar 24 horas antes de enviar un nuevo correo' })
    }

    const { nombre, email, observaciones, telefono, negocio } = req.body

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        await transporter.sendMail({
            from: email,
            to: 'meseguer318@gmail.com',
            text: `Nombre: ${nombre}\n Email: ${email} \n Telefono ${telefono} \n Tipo de negocio: ${negocio} \n Observaciones: ${observaciones}`
        });

        ipLog.set(ip, Date.now())
        res.json({ mensaje: 'Mensaje enviado correctamente' })
    } catch (error){
        console.log('Error al enviar el correo', error)
        res.status(500).json({ mensaje: 'Error al enviar el mensaje'})
    }
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})
