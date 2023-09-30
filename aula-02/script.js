/*
0 - OBTER USUARIO
1- OBTER NUMERO DE TELEFONE DE UM USUARIO A PARTIR DE SEU ID
2- OBTER O ENDERECO DO USUARIO PELO ID  
*/

const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  return new Promise(function resolverPromise(resolve, reject) {
    // QUANDO DER B.O CHAMAMOS O REJECT
    // QUANDO DER BOM CHAMAMOS O RESOLVE
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: "Aloha",
        sobrenome: "Hawai",
        dataNascimento: "02/04/2000 ",
      });
    });
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        numero: 4324234,
        ddd: 51,
      });
    });
  });
}

function obterEndereco(idUsuario, callback) {
  return callback(null, {
    rua: "dos bobos",
    bairro: "Disneylandia",
    numero: 949,
  });
}

const usuarioPromise = obterUsuario();
// para manipular o sucesso usamos o .then
// para manipular o erro usamos o .catch

// manipulando sucesso
usuarioPromise
.then(function (usuario){
    return obterTelefone(usuario.id)
    .then(function resolverTelefone(result){
        return {
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                dataNascimento: usuario.dataNascimento
            },
            telefone : result
        } 
    })
    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
})
  .then(function (resultado) {
    console.log(`
    Nome: ${resultado.usuario.nome}
    Sobrenome: ${resultado.usuario.sobrenome}
    Data de Nascimento> ${resultado.usuario.dataNascimento}
    Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero}
    Endereço: Rua ${resultado.endereco.rua}, ${resultado.endereco.numero}
    `);
  })
  // para manipular o error
  .catch(function (error) {
    console.error("DEU RUIM", error);
  });
