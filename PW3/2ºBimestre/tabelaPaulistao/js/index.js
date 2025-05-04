import { time } from './dadosTabelas.js';

// Selecionar todas as Trs da tabela
let trs = document.querySelectorAll("tr")


// Contador para pular linha
let pularLinhas = 0;


for (let index = 1; index < trs.length && pularLinhas < time.length; index++) {
    if (pularLinhas > 0 && pularLinhas % 4 === 0) {
        index++;
        if(index >= trs.length) break;
    }

    let tr = trs[index];

    tr = criarFilhos(tr);

    let filhos = tr.children;
    let vetor = Array.from(filhos);

    editarFilhos(vetor, pularLinhas, time);

    pularLinhas++;
}

function editarFilhos(filhos, index, time){
    filhos[0].textContent = time[index].classificacao;
    filhos[1].textContent = time[index].time;
    filhos[2].textContent = time[index].p;
    filhos[3].textContent = time[index].j;
    filhos[4].textContent = time[index].v;
    filhos[5].textContent = time[index].e;
    filhos[6].textContent = time[index].d;
    filhos[7].textContent = time[index].gp;
    filhos[8].textContent = time[index].gc;
    filhos[9].textContent = time[index].sg;
    filhos[10].textContent = time[index].porcentagem;
}

function criarFilhos(tr){
    let novaTD = document.createElement('td');
    tr.appendChild(novaTD);
    return tr;
}
