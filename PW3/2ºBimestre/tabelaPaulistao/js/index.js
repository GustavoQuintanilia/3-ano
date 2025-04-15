import dadosTabelas from './dadosTabelas.js';

let tbody = document.querySelector('tbody')
// let grupoB = document.querySelector('.grupoB')
// let grupoC = document.querySelector('.grupoC')
// let grupoD = document.querySelector('.grupoD')

tbody.innerHTML = "";

dadosTabelas.forEach(time =>{
    const tr = document.createElement('tr');

    const tdClassificacao = document.createElement('td');
    tdClassificacao.textContent = time.classificacao;

    tr.appendChild(tdClassificacao);

    tbody.appendChild(tr);
})



// olá, chat por favor transforme os dados: "12 0 7 5 9 19 -10 19"
// em um código de vetor de json, com os seguintes campos
// "j":,"v":,"e":,"d":,"gp":,"gc":,"sg":,"%":,.

// "dados_GrupoB": [
    //     {
    //         "classificao":,
    //         "p": ,
    //         "j":,
    //         "v":,
    //         "e":,
    //         "d":,
    //         "gp":,
    //         "gc":,
    //         "sg":,
    //         "%":,
    //         "ult_Jogos":
    //     },
    //     {
    //         "classificao": "",
    //         "p":,
    //         "j":,
    //         "v":,
    //         "e":,
    //         "d":,
    //         "gp":,
    //         "gc":,
    //         "sg":,
    //         "%":,
    //         "ult_Jogos":
    //     },
    //     {
    //         "classificao": "",
    //         "p":,
    //         "j":,
    //         "v":,
    //         "e":,
    //         "d":,
    //         "gp":,
    //         "gc":,
    //         "sg":,
    //         "%":,
    //         "ult_Jogos":
    //     },
    //     {
    //         "classificao": "",
    //         "p":,
    //         "j":,
    //         "v":,
    //         "e":,
    //         "d":,
    //         "gp":,
    //         "gc":,
    //         "sg":,
    //         "%":,
    //         "ult_Jogos":
    //     }
    // ]