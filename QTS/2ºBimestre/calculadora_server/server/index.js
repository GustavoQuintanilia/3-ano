const express = require('express')
const app = express()
app.use(express.json());
var cors = require('cors')



app.use(cors({
    origin: 3000
}));
app.use(
    express.urlencoded({
        extend: true
    })

)

app.get('/', function (req, res) {
  const retorno = {
      resp: "Hello World"
  }
  
    res.send(retorno)
}) 

//---------------------------

// Função para calcular a expressão no visor
app.post('/calcular', (req, res) => {
    try {
        const resultado = eval(req.body.calculo);

        if (resultado === Infinity || resultado === -Infinity) {
            return res.status(400).json({ resultado: 'Impossível dividir por 0.' });
        }

        res.json({resultado: resultado})
    } catch(err) {
       console.log(err);
       res.status(500).json({error:err})
    }
});

// Função para calcular a raiz quadrada do número exibido
app.post('/calcularRaiz', (req, res) => {
    const resultado = Math.sqrt(parseFloat(req.body.raiz));

    if (isNaN(resultado) || resultado < 0){
        return res.status(400).json({ resultado: 'Utilize um número real.' })
    }

    res.json({resultado: resultado})
});

// Função para calcular o quadrado do número exibido
app.post('/calcularQuadrado', (req, res) => {
    const resultado = Math.pow(parseFloat(req.body.potenciacao), 2);
    res.json({resultado: resultado})
});

module.exports = app;

app.listen(3000, () => console.log('Rodando na porta 3000'));
