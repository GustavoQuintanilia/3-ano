import { time } from './dadosTabelas.js';

// Selecionar todas as Trs da tabela
let trs = document.querySelectorAll("tr");

//Organiza os dados da tabela
time.forEach(time => {
    time.sg = time.gp - time.gc;
    time.p = (time.v * 3) + time.e;
});



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
};

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

    let pontos = time[index].p;
    let jogos = time[index].j;
    filhos[10].textContent = calcularPorcentagem(pontos, jogos);

    filhos[11].style = 'display: none;';
};

function calcularPorcentagem(pontos, jogos){
    return ((pontos / (jogos * 3 )) * 100).toFixed(0) + '%';
};


function criarFilhos(tr){
        let novaTD = document.createElement('td');
        tr.appendChild(novaTD);
        return tr;
};

