var pizza;
var imagem;
var PIZZARIA_ID = 'Pizzaria_Diloko'

var itensCardapio;
var itemAtual = 0;
var preco;
var quantidade;
var endereco;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    cordova.plugin.http.setDataSerializer('json');
    imagem = document.getElementById('imagem');
    pizza = document.getElementById('pizza');
    document.getElementById('btnNovo').addEventListener('click', novo);
    document.getElementById('btnFoto').addEventListener('click', foto);
    document.getElementById('btnSalvar').addEventListener('click', salvar);
    document.getElementById('btnExcluir').addEventListener('click', excluir);
    document.getElementById('btnCancelar').addEventListener('click', cancelar);
    carregarPizzas();
}

function novo() {
    applista.style.display = 'none'; // exibe lista
    appcadastro.style.display = 'flex'; // oculta cadastro
}

function foto() {
    imagem.style.backgroundColor = 'Blue';
    //imagem.innerHTML = '<img src="./img/pizza.png" alt=""></img>';
}

function salvar() {
    // espeficica o formato JSON para os dados enviados
    cordova.plugin.http.setDataSerializer('json');
    cordova.plugin.http.post('https://pedidos-pizzaria.glitch.me/admin/pizza/', {
        pizzaria: PIZZARIA_ID, 
        pizza: pizza.value, 
        preco: preco.value, 
        imagem: imagem.style.backgroundImage
    }, {}, function(response) {
        // verifica se deu certo (status = 200)
        alert(response.status);
    }, function(response) {
        alert(response.error);
    });
}

function excluir() {
    //deletar pizzas
    imagem.style.backgroundColor = 'Red';
}

function cancelar() {  
    applista.style.display = 'flex'; // exibe lista
    appcadastro.style.display = 'none'; // oculta cadastro
}

function carregarPizzas() {
    cordova.plugin.http.get('https://pedidos-pizzaria.glitch.me/admin/pizzas/:PIZZARIA_ID', {}, {}, 
    function(response) {
        itensCardapio = JSON.parse(response.data);
        atualizarTela();
    }, function(response) {
        alert(response.error);
    });
}