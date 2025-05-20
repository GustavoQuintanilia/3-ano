//POST do "index.js" refatorados para functions, para tornar possível testes unitários

//function para fazer as quatro operações básicas
function calcularOperacoes (calculo){
    try{
        const resultado = eval(calculo);
        if (resultado === Infinity || resultado === -Infinity){
            return { status: 400, resultado: 'Impossível dividir por 0.' };
        }
        return { status: 200, resultado };
    } catch (err) {
        return { status: 500, error: 'undefined' };
    }
}

//function para fazer a raiz quadrada
function calcularRaiz (raiz){
    const valor = parseFloat(raiz);
    const resultado = Math.sqrt(valor);

    if (isNaN(resultado) || resultado < 0 ){
        return { status: 400, resultado: 'Utilize um número real.' };
    }

    return {status: 200, resultado};
}
//function para fazer um número elevado ao quadrado
function calcularQuadrado(potenciacao) {
    const valor = parseFloat(potenciacao);
    const resultado = Math.pow(valor, 2);

    return { status: 200, resultado };
}

module.exports = {calcularOperacoes, calcularRaiz, calcularQuadrado};


