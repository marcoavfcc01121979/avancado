class HttpService {
    get(url) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);

            xhr.onreadystatechange = () => {
                /*
                 * 0: requisi��o ainda nao iniciada
                 * 1: conexao com o servidor estabelecida
                 * 2: requisi��o recebida
                 * 3:processando requisi��o
                 * 4:requisi��o concluida e a resposta pronta
                 */
                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };

            xhr.send();
        });
    }
}