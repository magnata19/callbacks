/*
0 - OBTER USUARIO
1- OBTER NUMERO DE TELEFONE DE UM USUARIO A PARTIR DE SEU ID
2- OBTER O ENDERECO DO USUARIO PELO ID  
*/

function obterUsuario(callback) {
    setTimeout(() => {
        return callback (null, {
            nome: 'Aloha',
            sobrenome: 'Hawai',
            dataNascimento: '02/04/2000 '
        })
    })
}

function obterTelefone(idUsuario, callback){
    setTimeout(() => {
        return callback (null, {
            numero: 4324234,
            ddd: 51
        })
    })
}

function obterEndereco(idUsuario, callback) {
    return callback(null, {
        rua: 'dos bobos',
        bairro: 'Disneylandia',
        numero: 949
    })
}

function resolverUsuario(erro, usuario) {
    console.log('usuario', usuario)
}

obterUsuario(function resolverUsuario(error, usuario) {
    if(error){
        console.error('DEU RUIM NO USUARIO')
    }
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if(error1){
            console.error('DEU RUIM NO TELEFONE')
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if(error2){
                console.error('DEU RUIM NO ENDERECO')
            }
            console.log(`
                Nome: ${usuario.nome}
                Sobrenome: ${usuario.sobrenome}
                Data de nascimento: ${usuario.dataNascimento}
                Telefone: (${telefone.ddd}) ${telefone.numero}
                Endereço: Rua ${endereco.rua}
                Número: ${endereco.numero}
                Bairro: ${endereco.bairro}
            `)
        })
    })
})