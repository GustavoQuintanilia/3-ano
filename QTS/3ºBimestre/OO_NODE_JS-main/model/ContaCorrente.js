const {Titular, getTitulares } = require ("./Titular.js")
const {Conta} = require('./Conta.js')

class ContaCorrente extends Conta{
    static contasCC = []
    
    constructor(saldo, senha, agencia, numero, titular){
        super(saldo, senha, numero, agencia, titular)
        ContaCorrente.contasCC.push(this)
    }
    
    cobrarTaxa(){
         this.saldo = this.saldo - 20
    }

    static gerarContasCorrentes(){
        Titular.gerarTitulares()
        let titularesCC = Titular.titulares
        
        new ContaCorrente(1200, 4321, 101, 1001, titularesCC[0]);
        new ContaCorrente(750, 8765, 102, 1002, titularesCC[1]);
        new ContaCorrente(1800, 3412, 103, 1003, titularesCC[2]);
        new ContaCorrente(2200, 9988, 104, 1004, titularesCC[3]);
        new ContaCorrente(300, 1111, 105, 1005, titularesCC[4]);
        new ContaCorrente(640, 2222, 106, 1006, titularesCC[5]);
        new ContaCorrente(2700, 3333, 107, 1007, titularesCC[6]);
        new ContaCorrente(3500, 4444, 108, 1008, titularesCC[7]);
        new ContaCorrente(900, 5555, 109, 1009, titularesCC[8]);
        new ContaCorrente(1300, 6666, 110, 1010, titularesCC[9]);
        new ContaCorrente(1550, 7777, 111, 1011, titularesCC[10]);
        new ContaCorrente(2100, 8888, 112, 1012, titularesCC[11]);
        new ContaCorrente(1700, 9999, 113, 1013, titularesCC[12]);
        new ContaCorrente(2800, 1212, 114, 1014, titularesCC[13]);
        new ContaCorrente(1900, 3434, 115, 1015, titularesCC[14]);
        new ContaCorrente(660, 5656, 116, 1016, titularesCC[15]);
        new ContaCorrente(1100, 7878, 117, 1017, titularesCC[16]);
        new ContaCorrente(2400, 9090, 118, 1018, titularesCC[17]);
        new ContaCorrente(500, 2020, 119, 1019, titularesCC[18]);
        new ContaCorrente(3100, 3030, 120, 1020, titularesCC[19]);
        
    }
}

module.exports = {ContaCorrente}