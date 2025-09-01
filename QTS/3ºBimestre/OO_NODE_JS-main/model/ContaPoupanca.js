const {Titular, getTitulares } = require ("./Titular.js");
const {Conta} = require('./Conta.js');

class ContaPoupanca extends Conta{
    static contasP = [];

    constructor(saldo, senha, agencia, numero, titular){
        super(saldo, senha, numero, agencia, titular);
        ContaPoupanca.contasP.push(this);
    };

    // Polimorfismo no cobrarTaxa, pois poupança não paga taxa
    cobrarTaxa(){
        return{ taxa: `Não é necessário pagar taxa, seu saldo permanece: ${this.saldo}.`};
    };

    //Criação de um método para adicionar um redimento
    aplicarRendimento(acesso) {

        //if para uma proteção simples 
        if (!acesso) {
            return { error: "Acesso negado" };

        };

        //if para dar uma resposta caso não tenha saldo para aplicar o rendimento
        if (this.saldo <= 0) {
            return { rendimento: "Você não possui saldo para aplicar rendimento", saldo: this.saldo };

        };

        let rendimento = 0;

        //if para aplicar o redimento de acordo com o saldo
        if (this.saldo <= 1000) {
            rendimento = this.saldo * 0.003; // 0,3%

        } else if (this.saldo > 1000 && this.saldo <= 5000) {
            rendimento = this.saldo * 0.004; // 0,4%

        } else {
            rendimento = this.saldo * 0.005; // 0,5%

        };

        this.saldo += rendimento;

        return { rendimento: `Seu rendimento aplicado é: R$ ${rendimento.toFixed(2)}. E seu saldo atual: R$ ${this.saldo.toFixed(2)}` };

    };

    static gerarContasPoupancas(){
        Titular.gerarTitulares();
        let titularesP = Titular.titulares;
        
            new ContaPoupanca(800, 1111, 201, 2001, titularesP[0]);
            new ContaPoupanca(1400, 2222, 202, 2002, titularesP[1]);
            new ContaPoupanca(950, 3333, 203, 2003, titularesP[2]);
            new ContaPoupanca(1700, 4444, 204, 2004, titularesP[3]);
            new ContaPoupanca(2100, 5555, 205, 2005, titularesP[4]);
            new ContaPoupanca(600, 6666, 206, 2006, titularesP[5]);
            new ContaPoupanca(1300, 7777, 207, 2007, titularesP[6]);
            new ContaPoupanca(2500, 8888, 208, 2008, titularesP[7]);
            new ContaPoupanca(5800, 9999, 209, 2009, titularesP[8]);
            new ContaPoupanca(400, 1010, 210, 2010, titularesP[9]);
            new ContaPoupanca(2200, 1212, 211, 2011, titularesP[10]);
            new ContaPoupanca(3000, 1313, 212, 2012, titularesP[11]);
            new ContaPoupanca(500, 1414, 213, 2013, titularesP[12]);
            new ContaPoupanca(900, 1515, 214, 2014, titularesP[13]);
            new ContaPoupanca(1600, 1616, 215, 2015, titularesP[14]);
            new ContaPoupanca(2700, 1717, 216, 2016, titularesP[15]);
            new ContaPoupanca(1200, 1818, 217, 2017, titularesP[16]);
            new ContaPoupanca(3500, 1919, 218, 2018, titularesP[17]);
            new ContaPoupanca(700, 2020, 219, 2019, titularesP[18]);
            new ContaPoupanca(2400, 2121, 220, 2020, titularesP[19]);

    };
     
}

module.exports = { ContaPoupanca };