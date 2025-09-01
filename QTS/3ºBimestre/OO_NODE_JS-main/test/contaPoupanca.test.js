const { ContaPoupanca } = require('../model/ContaPoupanca.js');

ContaPoupanca.gerarContasPoupancas();
let contasP = ContaPoupanca.contasP;


//--------------------------------------------------------------------
test('Teste da lista de contas poupanças', ()=> {
    expect(contasP.length).toBe(20);
});

//---------------------------Construtor--------------------------------
test('Teste para criar uma nova conta poupança manualmente', ()=> {
    const novoTitular = {nome: "Gustavo Brayan"}
    let conta = new ContaPoupanca(1050, 4565, 250, 2550, novoTitular);

    expect(conta.saldo).toBe(1050);
    expect(conta.numero_conta).toBe(250);
    expect(conta.agencia).toBe(2550);
    expect(conta.titular).toBe(novoTitular);
});

//---------------------------Taxa(polimorfismo)--------------------------------
test('Teste cobrança de taxa na conta poupança não muda o saldo', ()=> {
    let conta = contasP[0];
    let resultado = conta.cobrarTaxa();

    expect(resultado.taxa).toBe(`Não é necessário pagar taxa, seu saldo permanece: 800.`);
});

//---------------------------Aplicação do rendimento--------------------------------
test('Teste para aplicação de redimento com as diferentes respostas do método', ()=> {
    // Saldo menor que 1000 rendimento de 0,3%
    let conta1 = contasP[0]; // saldo 800
    let resultado1 = conta1.aplicarRendimento(true);
    expect(resultado1.rendimento).toBe(`Seu rendimento aplicado é: R$ ${(800*0.003).toFixed(2)}. E seu saldo atual: R$ ${(800 + 800*0.003).toFixed(2)}`);

    // Saldo entre 1000 e 5000 rendimento de 0,4%
    let conta2 = contasP[3]; // saldo 1700
    let resultado2 = conta2.aplicarRendimento(true);
    expect(resultado2.rendimento).toBe(`Seu rendimento aplicado é: R$ ${(1700*0.004).toFixed(2)}. E seu saldo atual: R$ ${(1700 + 1700*0.004).toFixed(2)}`);

    // Saldo acima de 5000 rendimento de 0,5%
    let conta3 = contasP[8]; // saldo 5800
    let resultado3 = conta3.aplicarRendimento(true);
    expect(resultado3.rendimento).toBe(`Seu rendimento aplicado é: R$ ${(5800*0.005).toFixed(2)}. E seu saldo atual: R$ ${(5800 + 5800*0.005).toFixed(2)}`);

    // Saldo zero
    let conta4 = contasP[11];
    conta4.saldo = 0;
    let resultado4 = conta4.aplicarRendimento(true);
    expect(resultado4.rendimento).toBe("Você não possui saldo para aplicar rendimento");

    // Acesso negado
    let conta5 = contasP[12]; 
    let resultado5 = conta5.aplicarRendimento(false);
    expect(resultado5.error).toBe("Acesso negado");

});


//---------------------------Transferência--------------------------------
test('Teste transferência com sucesso entre as contas poupança', ()=> {
    let origem = contasP[16]; // Saldo 1200
    let destino = contasP[17]; // saldo 3500

    let resultado = origem.transferir(
        { agencia: origem.agencia, numero: origem.numero_conta, senha: origem.senha },
        { agencia: destino.agencia, numero: destino.numero_conta, senha: destino.senha },
        200
    );

    expect(resultado).toEqual({transferencia: "Realizada com sucesso"});
    expect(origem.saldo).toBe(1000);
    expect(destino.saldo).toBe(3700);
});

//---------------------------
test('Teste de falha na transferência por saldo insuficiente conta poupança', ()=> {
    let origem = contasP[18]; // Saldo 700
    let destino = contasP[19]; // Saldo 2400

    let resultado = origem.transferir(
        { agencia: origem.agencia, numero: origem.numero_conta, senha: origem.senha },
        { agencia: destino.agencia, numero: destino.numero_conta, senha: destino.senha },
        1000
    );

    expect(resultado).toEqual({transferencia: "Não realizada com sucesso"});
    expect(origem.saldo).toBe(700);
    expect(destino.saldo).toBe(2400);
});

//---------------------------
test('Teste de falha na transferência por conta de origem inexistente (poupança)', ()=> {
    let origemInesistente = { agencia: 0, numero_conta: 0, senha: 0 };
    let destino = contasP[19]; 

    let resultado = contasP[19].transferir(
        origemInesistente,
        { agencia: destino.agencia, numero: destino.numero_conta, senha: destino.senha },
        700
    );

    expect(resultado).toEqual({conta: "Conta de origem inexistente"});
    expect(destino.saldo).toBe(2400);
});

//---------------------------
test('Teste de falha na transferência por conta de destino inexistente (poupança)', ()=> {
    let origem = contasP[18];
    let destinoInesistente = { agencia: 0, numero_conta: 0, senha: 0 };
     
    let resultado = contasP[18].transferir(
        { agencia: origem.agencia, numero: origem.numero_conta, senha: origem.senha },
        destinoInesistente,
        600
    );

    expect(resultado).toEqual({conta: "Conta de destino inexistente"});
    expect(origem.saldo).toBe(700);
});

//---------------------------Saque--------------------------------
test('Teste de saque da conta poupança', ()=> {
    // Saque realizado com sucesso
    let conta = contasP[9]; //saldo 400
    let resultado1 = conta.saque(300, true);
    expect(resultado1.saque).toMatch("Saque de 300 realizado com sucesso, seu saldo atual é 100");

    // Saque não autorizado
    let resultado2 = conta.saque(500, false);
    expect(resultado2.error).toBe("Acesso negado");

    // Saque não realizado por falta de saldo
    let resultado3 = conta.saque(600, true);
    expect(resultado3.saque).toBe("Saque não realizado por falta de saldo");
});

//---------------------------Depósito--------------------------------
test('Teste de depósito da conta poupança', () => {
    let conta = contasP[12]; // Saldo 500

    // Depósito realizado com sucesso 
    let resultado1 = conta.depositar(500, true);
    expect(resultado1.deposito).toMatch("Realizado deposito de 500 com sucesso, seu saldo atual é 1000");

    // Depósito não autorizado
    let resultado2 = conta.depositar(200, false);
    expect(resultado2.deposito).toBe("Acesso negado");
});

//---------------------------Visualizar saldo--------------------------------
test('Teste para visualizar o saldo da conta poupança', () => {
    let conta = contasP[6];

    // sucesso
    let resultado1 = conta.visualizarSaldo(true);
    expect(resultado1.saldo).toBe(conta.saldo);

    // Acesso negado
    let resultado2 = conta.visualizarSaldo(false);
    expect(resultado2.error).toBe("Acesso negado");
});

//---------------------------Autenticação--------------------------------
test('Teste de autenticação da conta poupança (sucesso e falha)', () => {
    let conta = contasP[15];

    // sucesso
    let resultado1 = ContaPoupanca.autenticar(conta.agencia, conta.numero_conta, conta.senha);
    expect(resultado1.acesso).toBe(true);
    expect(resultado1.conta.saldo).toBe(conta.saldo);

    // Não autenticado
    let resultado2 = ContaPoupanca.autenticar(conta.agencia, conta.numero_conta, 1715);
    expect(resultado2.acesso).toBe(false);
    expect(resultado2.conta).toBe(null);
});
