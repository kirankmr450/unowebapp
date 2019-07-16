var Env = (() => {
    const API_HOST = 'http://localhost';
    const API_PORT = '3000';

    return {
       getBaseUrl: () => (API_HOST + ':' + API_PORT)
    };
})();
