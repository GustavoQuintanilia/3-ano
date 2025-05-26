const textCep = document.querySelector('#textCep');
const cep = document.querySelector('#cep');
const logradouro = document.querySelector('#logradouro');
const complemento = document.querySelector('#complemento');
const unidade = document.querySelector('#unidade');
const bairro = document.querySelector('#bairro');
const localidade = document.querySelector('#localidade');
const uf = document.querySelector('#uf');
const estado = document.querySelector('#estado');
const regiao = document.querySelector('#regiao');
const ibge = document.querySelector('#ibge');
const gia = document.querySelector('#gia');
const ddd = document.querySelector('#ddd');
const siafi = document.querySelector('#siafi');

//Controlando o que escrever no campo textCep
textCep.addEventListener('keydown', async (event) => {
    if(event.key === 'Enter'){
        try {
            const cepValue = textCep.value.trim();

            // Verificar se só tem números no campo
            const textNumber = /^[0-9]+$/.test(cepValue);

            // Verificar se o CEP tem os obrigatórios 8 caracteres
            const tamanhoCep = /^[0-9]{8}$/.test(cepValue);

            //Mensagem de erro para letras no campo
            if(!textNumber){
                 throw new Error('Digite apenas números neste campo!');
            }

            //Mensagem de erro para ultrapassagem de caracteres
            if(!tamanhoCep){
                throw new Error('O CEP tem que ter 8 caracteres!');
            }

            //Receber o cep e apresentar os dados 
            const resposta = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);

            if (!resposta.ok){
                throw await resposta.json();
            }

            const cepResposta = await resposta.json();

            cep.value = cepResposta.cep;
            logradouro.value = cepResposta.logradouro;
            complemento.value = cepResposta.complemento;
            unidade.value = cepResposta.unidade;
            bairro.value = cepResposta.bairro;
            localidade.value = cepResposta.localidade;
            uf.value = cepResposta.uf;
            estado.value = cepResposta.estado;
            regiao.value = cepResposta.regiao;
            ibge.value = cepResposta.ibge;
            gia.value = cepResposta.gia;
            ddd.value = cepResposta.ddd;
            siafi.value = cepResposta.siafi;

        } catch (error) {
                alert(error.message);
                textCep.value = '';
                textCep.focus();
        }
    }
});

