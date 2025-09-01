const { ContaCorrente } = require('../model/ContaCorrente.js');

ContaCorrente.gerarContasCorrentes();
let contasCC = ContaCorrente.contasCC;


//-----------------------------------------------------------
test('Teste da lista de contas correntes', ()=> {
    expect(contasCC.length).toBe(20);
});

//---------------------------Construtor--------------------------------
test('Teste para criar uma nova conta corrente manualmente', ()=> {
    const novoTitular = {nome: "Vittor Sirqueira"}
    let conta = new ContaCorrente(650, 2430, 100, 3000, novoTitular);

    expect(conta.saldo).toBe(650);
    expect(conta.numero_conta).toBe(100);
    expect(conta.agencia).toBe(3000);
    expect(conta.titular).toBe(novoTitular);
});

//---------------------------Taxa--------------------------------
test('Cobrança da taxa causando redução do saldo', ()=> {
    let conta = contasCC[0];
    conta.cobrarTaxa();

    expect(conta.saldo).toBe(1180);
});

//---------------------------Transferência--------------------------------
test('Teste transferência com sucesso entre contas correntes', ()=> {
    let origem = contasCC[2]; //saldo 1800
    let destino = contasCC[3]; //saldo 2200

    let resultado = origem.transferir(
        { agencia: origem.agencia, numero: origem.numero_conta, senha: origem.senha },
        { agencia: destino.agencia, numero: destino.numero_conta, senha: destino.senha },
        200
    );

    expect(resultado).toEqual({transferencia: "Realizada com sucesso"});
    expect(origem.saldo).toBe(1600);
    expect(destino.saldo).toBe(2400);
});

//---------------------------
test('Teste de falha na transferência por saldo insuficiente', ()=> {
    let origem = contasCC[4]; //saldo 300   
    let destino = contasCC[5]; //saldo 640

    let resultado = origem.transferir(
        { agencia: origem.agencia, numero: origem.numero_conta, senha: origem.senha },
        { agencia: destino.agencia, numero: destino.numero_conta, senha: destino.senha },
        500
    );

    expect(resultado).toEqual({transferencia: "Não realizada com sucesso"});
    expect(origem.saldo).toBe(300);
    expect(destino.saldo).toBe(640);
});

//---------------------------
test('Teste de falha na transferência por conta de origem inesistente', ()=> {
    let origemInesistente = { agencia: 0, numero_conta: 0, senha: 0 };
    let destino = contasCC[7]; 

    let resultado = contasCC[7].transferir(
        origemInesistente,
        { agencia: destino.agencia, numero: destino.numero_conta, senha: destino.senha },
        600
    );

    expect(resultado).toEqual({conta: "Conta de origem inexistente"});
    expect(destino.saldo).toBe(3500);
});

//---------------------------
test('Teste de falha na transferência por conta de destino inesistente', ()=> {
    let origem = contasCC[8];
    let destinoInesistente = { agencia: 0, numero_conta: 0, senha: 0 };
     
    let resultado = contasCC[8].transferir(
        { agencia: origem.agencia, numero: origem.numero_conta, senha: origem.senha },
        destinoInesistente,
        650
    );

    expect(resultado).toEqual({conta: "Conta de destino inexistente"});
    expect(origem.saldo).toBe(900);
});

//---------------------------Saque--------------------------------
test('Teste para saque na conta corrente', ()=> {
    let conta = contasCC[10]; //saldo 1550

    // saldo realizado com sucesso
    let resp1 = conta.saque(500, true);
    expect(resp1.saque).toBe("Saque de 500 realizado com sucesso, seu saldo atual é 1050");

    // saldo não autorizado
    let resp2 = conta.saque(250, false);
    expect(resp2.error).toBe("Acesso negado");

    // saldo não realizado por saldo insuficiente
    let resp3 = conta.saque(2000, true);
    expect(resp3.saque).toBe("Saque não realizado por falta de saldo");


});

//---------------------------Depósito--------------------------------
test('Teste para depósito na conta corrente', () => {
    let conta = contasCC[7];  //saldo 3500

    // Depósito realizado com sucesso 
    let resp1 = conta.depositar(400, true);
    expect(resp1.deposito).toBe("Realizado deposito de 400 com sucesso, seu saldo atual é 3900");

    // Depósito não permitido
    let resp2 = conta.depositar(100, false);
    expect(resp2.deposito).toBe("Acesso negado");

});

//---------------------------Visualizar saldo--------------------------------
test('Teste para visualizar o saldo da conta corrente', () => {
    let conta = contasCC[12];  //saldo 1700

    // Visualição do saldo com sucesso 
    let resp1 = conta.visualizarSaldo(true);
    expect(resp1.saldo).toBe(1700);

    // Visualição do saldo não permitida
    let resp2 = conta.visualizarSaldo(false);
    expect(resp2.error).toBe("Acesso negado");

});

//---------------------------Autenticação--------------------------------
test('Teste de autenticação da conta corrente (sucesso e falha)', () => {
    let conta = contasCC[15];

    // Senha correta
    let resp1 = ContaCorrente.autenticar(conta.agencia, conta.numero_conta, conta.senha);
    expect(resp1.acesso).toBe(true);
    expect(resp1.conta.saldo).toBe(660);
    
    // Senha incorreta
    let resp2 = ContaCorrente.autenticar(conta.agencia, conta.numero_conta, 1016);
    expect(resp2.acesso).toBe(false);
    expect(resp2.conta).toBe(null);

});
