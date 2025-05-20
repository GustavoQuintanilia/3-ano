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

// const request = require('supertest');//Ferramenta usada para testar coisas como rotas do Express de maneira automatizada, sem realmente precisar subir um servidor.
// const app = require('../index.js');

// //teste do post(/calcular)
// describe('POST/calcular', () => {
//   it('teste de soma', async () => {
//     const res = await request(app)
//       .post('/calcular')
//       .send({ calculo: '4+6' });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.resultado).toBe(10);
//   });

//   it('teste de subtração', async () => {
//     const res = await request(app)
//       .post('/calcular')
//       .send({ calculo: '15-10' });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.resultado).toBe(5);
//   });

//   it('teste de multiplicação', async () => {
//     const res = await request(app)
//       .post('/calcular')
//       .send({ calculo: '5*5' });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.resultado).toBe(25);
//   });

//   it('teste de divisão', async () => {
//     const res = await request(app)
//       .post('/calcular')
//       .send({ calculo: '81/9' });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.resultado).toBe(9);
//   });
  
//   it('teste de operação incompleta', async () => {
//     const res = await request(app)
//       .post('/calcular')
//       .send({ calculo: '10+' });

//     expect(res.statusCode).toBe(500);
//     expect(res.body.resultado).toBe(undefined);
//   });

//   it('teste de divisão por 0', async () => {
//     const res = await request(app)
//       .post('/calcular')
//       .send({ calculo: '3/0' });

//     expect(res.statusCode).toBe(400);
//     expect(res.body.resultado).toBe('Impossível dividir por 0.');
//   });

// });

// //teste do post(/calcularRaiz)
// describe('POST/calcularRaiz', () => {
//   it('teste de raiz quadrada', async () => {
//     const res = await request(app)
//       .post('/calcularRaiz')
//       .send({ raiz: '49' });

//     expect(res.status).toBe(200);
//     expect(res.body.resultado).toBe(7);
//   });

//   it('teste de raiz quadrada de 0', async () => {
//     const res = await request(app)
//       .post('/calcularRaiz')
//       .send({ raiz: '0' });

//     expect(res.status).toBe(200);
//     expect(res.body.resultado).toBe(0);
//   });

//   it('teste de raiz quadrada com número negativo', async () => {
//     const res = await request(app)
//       .post('/calcularRaiz')
//       .send({ raiz: '-7' });

//     expect(res.status).toBe(400);
//     expect(res.body.resultado).toBe('Utilize um número real.');
//   });

// });

// //teste do post(/calcularQuadrado)
// describe('POST/calcularQuadrado', ()=> {
//   it('teste de um número elevado ao quadrado', async () => {
//     const res = await request(app)
//       .post('/calcularQuadrado')
//       .send({ potenciacao: '8' });

//     expect(res.status).toBe(200);
//     expect(res.body.resultado).toBe(64);
//   });

//    it('teste de um número negativo elevado ao quadrado', async () => {
//     const res = await request(app)
//       .post('/calcularQuadrado')
//       .send({ potenciacao: '-4' });

//     expect(res.status).toBe(200);
//     expect(res.body.resultado).toBe(16);
//   });

  
//    it('teste de 0 elevado ao quadrado', async () => {
//     const res = await request(app)
//       .post('/calcularQuadrado')
//       .send({ potenciacao: '0' });

//     expect(res.status).toBe(200);
//     expect(res.body.resultado).toBe(0);
//   });

// });
