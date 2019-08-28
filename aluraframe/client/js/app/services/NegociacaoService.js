class NegociacaoService {
    obterNegociacoesDaSemana(cb) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {
            /*
             * 0: requisição ainda nao iniciada
             * 1: conexao com o servidor estabelecida
             * 2: requisição recebida
             * 3:processando requisição
             * 4:requisição concluida e a resposta pronta
             */
            if (xhr.readyState == 4) {

                if (xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto =>
                            new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                        
                    
                } else {
                    console.log(xrh.responseText);
                    cd('Nao foi possivel obter as negociacoes');
                    
                }
            }
        };

        xhr.send();
    }
}