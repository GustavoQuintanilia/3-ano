import { time } from './dadosTabelas.js';

// Selecionar todas as Trs da tabela
let trs = document.querySelectorAll("tr")


//Contar quantas linhas foram preenchidas
let contLinhas = 0;

for (let index = 1; index < trs.length; index++) {

    let tr = trs[index];

    tr = criarFilhos(tr)

    let filhos = tr.children;
    let vetor = Array. from(filhos);

    editarFilhos(vetor, (index - 1), time);

    contLinhas++;
    if (contLinhas > 0 && contLinhas % 4 === 0) {
        index+= 1;
    }
}

function editarFilhos(filhos, index, time){
    filhos[0].textContent = time[index].classificacao
    filhos[1].textContent = time[index].p
    filhos[2].textContent = time[index].j
    filhos[3].textContent = time[index].v
    filhos[4].textContent = time[index].e
    filhos[5].textContent = time[index].d
    filhos[6].textContent = time[index].gp
    filhos[7].textContent = time[index].gc
    filhos[8].textContent = time[index].sg
    filhos[9].textContent = time[index].porcentagem
    filhos[10].textContent = time[index].ult_Jogos
}


function criarFilhos(tr){
    let novaTD = document.createElement('td')
    tr.appendChild(novaTD)
    return tr
   
}
