var ConnectionFactory = (function tmp() {
    const stories = ['negociacoes'];
    const version = 4;
    const dbName = 'aluraframe';

    var connection = null;

    var close = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error('nao e possivel criar uma instancia da classe Connection Factory.');
        }

        static getConnection() {

            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {

                    ConnectionFactory._createStores(e.target.result);

                };

                openRequest.onsuccess = e => {
                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function () {
                            throw new Error('voce nao podera fechar a conexao diretamente!');
                        };
                    } 
                    resolve(connection);
                };

                openRequest.onerror = e => {
                    console.log(e.target.error);

                    reject(e.target.error.name);
                };

            });

        }

        static _createStores(connection) {

            stories.forEach(store => {
                if (connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store);

                connection.createObjectStore(store, { autoIncrement: true });
            });
        }
        static closeConnection() {
            if (connection) {
                close();
                connection = null;
            }
        }
    }
})();
