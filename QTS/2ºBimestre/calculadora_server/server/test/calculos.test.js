const {calcularOperacoes, calcularRaiz, calcularQuadrado} = require('../calculos.js');

//teste da function calcularOperacoes()
describe('calcularOperacoes', () => {
  //----------------------------------
  test('teste de soma', () => {
    const calculo = calcularOperacoes('4+6');
    expect(calculo).toEqual({status: 200, resultado: 10});
  });

  //----------------------------------
  test('teste de subtração', () => {
    const calculo = calcularOperacoes('15-10');
    expect(calculo).toEqual({status: 200, resultado: 5});
  });

  //----------------------------------
  test('teste de multiplicação', () => {
    const calculo = calcularOperacoes('5*5');
    expect(calculo).toEqual({status: 200, resultado: 25});
  });

  //----------------------------------
  test('teste de divisão', () => {
    const calculo = calcularOperacoes('81/9');
    expect(calculo).toEqual({status: 200, resultado: 9});
  });

  //----------------------------------
  test('teste de operação incompleta', () => {
    const calculo = calcularOperacoes('10+');
    expect(calculo.status).toBe(500);
    expect(calculo.error).toBe('undefined');
  });

  //----------------------------------
  test('teste de divisão por 0', () => {
    const calculo = calcularOperacoes('3/0');
    expect(calculo).toEqual({ status: 400, resultado: 'Impossível dividir por 0.' });
  });

});

//teste da function calcularRaiz()
describe('calcularRaiz', () => {
  test('teste de raiz quadrada', () => {
    const raiz = calcularRaiz('49');
    expect(raiz).toEqual({ status: 200, resultado: 7 });
  });

  //----------------------------------
  test('teste de raiz quadrada de 0', () => {
    const raiz = calcularRaiz('0');
    expect(raiz).toEqual({ status: 200, resultado: 0 });
  });

  //----------------------------------
  test('teste de raiz quadrada com número negativo', () => {
    const raiz = calcularRaiz('-7');
    expect(raiz).toEqual({ status: 400, resultado: 'Utilize um número real.' });
  });

});

//teste da function calcularQuadrado()
describe('calcularQuadrado', () => {
  test('teste de um número elevado ao quadrado', () => {
    const potenciacao = calcularQuadrado('8');
    expect(potenciacao).toEqual({ status: 200, resultado: 64 });
  });

  //----------------------------------
  test('teste de um número negativo elevado ao quadrado', () => {
    const potenciacao = calcularQuadrado('-4');
    expect(potenciacao).toEqual({ status: 200, resultado: 16 });
  });

  //----------------------------------
  test('teste de 0 elevado ao quadrado', () => {
    const potenciacao = calcularQuadrado('0');
    expect(potenciacao).toEqual({ status: 200, resultado: 0 });
  });

});

