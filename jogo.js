var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaZezinhoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal') {
	//1500
	criaZezinhoTempo = 1500
} else if(nivel === 'dificil') {
	//1000
	criaZezinhoTempo = 1000
} else if(nivel === 'zerosnando'){
	//750
	criaZezinhoTempo = 750
}


//criando função para capturar o tamanho da pagina
function ajustaTamanhoPalcoJogo(){
	altura = window.innerHeight
	largura = window.innerWidth
	console.log(largura, altura);
}

ajustaTamanhoPalcoJogo();

var cronometro = setInterval(function() {
	
	tempo -= 1

	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criarZezinho)
		window.location.href = 'vitoria.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo
	}

	
	
}, 1000)

//incluindo o script numa função para seguir a sequencia gravitacional no body, evitando o erro do appendChild
function posicaoRandomica() {

	//remover mosquito anterior caso exista
	if(document.getElementById('zezinho')) {
		document.getElementById('zezinho').remove()

		if(vidas > 3) {

			window.location.href = 'fim_de_jogo.html'
		} else {
			document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
			
			vidas++
		}
	}


	//incluindo a posição do zezinho de forma randomica na pagina
	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90

	//evitando posição randomica negativa na pagina
	posicaoX = posicaoX < 0  ? 0 : posicaoX
	posicaoY = posicaoY < 0  ? 0 : posicaoY

	console.log(posicaoX, posicaoY);

	//criar o elemento html e incluir no body da página de forma programatica
	var zezinho = document.createElement('img')
	zezinho.src = 'imagens/zezinho.png'
	zezinho.className = tamanhoAleatorio() + ' ' + ladoAleatorio() //atribuindo a class zezinho1 na imagem programatica
	zezinho.style.left = posicaoX + 'px'
	zezinho.style.top = posicaoY + 'px'
	zezinho.style.position = 'absolute'
	zezinho.id = 'zezinho'
	zezinho.onclick = function(){
		this.remove()
	}

	document.body.appendChild(zezinho)



}	

//função para mudar o tamanho da imagem do Zezinho de forma aleatória (classe aleatória)
function tamanhoAleatorio(){
	var classe = Math.floor(Math.random() * 3)
	
	switch(classe) { //nao preciso do break pois o return volta para quem chamou a função e breca o fluxo
		case 0:
				return 'zezinho1'

		case 1:
				return 'zezinho2'
				
		case 2:
				return 'zezinho3'				
	}
}

//função para alterar o lado da imagem (flip)
function ladoAleatorio(){
	var classe = Math.floor(Math.random() * 2)

	switch(classe) { //nao preciso do break pois o return volta para quem chamou a função e breca o fluxo
		case 0:
				return 'ladoA'

		case 1:
				return 'ladoB'
	}
}