let display = document.getElementById("display");
let entradaAtual = ""
let operadorAtual = ""


//Função que pega o número que foi digitado pelo usuário
function appendNumber(value){
    entradaAtual += value;
    display.textContent = entradaAtual;
}


//Função que pega o operador que foi digitado pelo usuário
function appendOperador(operador){
    if(entradaAtual === "" && operador !== "-" && operador !== "(") return
    entradaAtual += operador;
    display.textContent = entradaAtual;
}

// Função para calcular as operações
function calculate() {
    try {
        // Verifica se a entrada contém um símbolo de porcentagem
        if (entradaAtual.includes('%')) {
            // Remove o símbolo de porcentagem e converte para número
            let partes = entradaAtual.split('%');
            let numero = parseFloat(partes[0].trim());
            let total = parseFloat(partes[1].trim());
            // Calcula a porcentagem
            let resultado = (numero * total) / 100;
            entradaAtual = resultado;
        } else {
            // Avalia a expressão normalmente
            let resultado = eval(entradaAtual);
            if (!Number.isInteger(resultado)) {
                resultado = resultado.toFixed(2);
            }
            entradaAtual = resultado;
        }
        display.textContent = entradaAtual;
    } catch (error) {
        display.textContent = "Nada para calcular";
        entradaAtual = "";
    }
}


//Função para apagar o caracteres um de cada vez
function back(){
    let display = document.querySelector(".display").innerHTML;
    document.querySelector('.display').innerHTML = display.substring(
    0, 
    display.length -1);
    entradaAtual = ""
}

//Função para limpar o display
function clearDisplay(){
    entradaAtual = "";
    display.textContent = entradaAtual;
}

