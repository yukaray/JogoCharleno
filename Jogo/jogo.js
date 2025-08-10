const div1 = document.createElement('div');

const pessoa = document.createElement('span')

const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

let dificuldadeSelecionada,animacao,cooldown = false,cabou= false,subirvezes;

const letreiroPlayer = document.createElement('section')
const palavra = document.createElement("div")
const letreiroPalavra = document.createElement('section')
const input = document.createElement("input");
let quantidade = 1
  
let animframe
let yAtual = 0
let decremento = 1

const templatCronometro = document.createElement('div')

templatCronometro.id = 'cronometro'

let hrs=0,mnts=0,segs=0

let palavraDificuldade,palavrasAcertadas=0,interval,perdeu = false

templatCronometro.textContent = '00:00:00'

const palavrasCertas = {
  facil: [
    // 3 letras (30 palavras)
    "asa", "sol", "mar", "rio", "voz", "lar", "céu", "paz", "bem", "mal",
    "cor", "dia", "fim", "ver", "dar", "ser", "ter", "ato", "rei", "bar",
    "som", "luz", "nós", "ela", "ele", "vou", "sou", "era", "dor", "ovo",
    // 5 letras (30 palavras)
    "casal", "tempo", "saúde", "fruta", "sonho", "razão", "praia", "noite", "pedra", "ordem",
    "gente", "verde", "rosto", "papel", "feliz", "letra", "jogo", "livro", "grupo", "famoso",
    "piano", "brisa", "vento", "palco", "cobre", "sangue", "ferro", "tinta", "redes", "canto"
  ],

  medio: [
    // 6 letras (30 palavras)
    "amigos", "flores", "barcos", "pedras", "sonhos", "ventos", "nuvens", "letras", "livros", "bronze",
    "prata", "cores", "gritos", "campos", "praias", "terras", "ordens", "faixas", "folhas", "trilha",
    "ondas", "estrelas", "belas", "frutas", "risada", "festas", "mundos", "palmas", "danças", "águas",
    // 7 letras (30 palavras)
    "amizade", "coragem", "respeito", "família", "justiça", "esperar", "alegria", "tristeza", "vitória", "passado",
    "presente", "cultura", "riqueza", "pobreza", "verdade", "memória", "ciência", "natureza", "destino", "cuidado",
    "trabalho", "esforço", "vontade", "desejo", "lamento", "jornada", "caminho", "guerra", "batalha", "abrigo"
  ],

  dificil: [
    // 8 letras (30 palavras)
    "abacaxi", "abduzido", "abissais", "abóbadas", "açucenas", "adjetivo", "afetivos", "alicerce", "alqueire", "amizades",
    "amígdala", "analista", "ancorado", "aspirina", "avestruz", "baixista", "barbeiro", "cachorro", "colheita", "criatura",
    "destinos", "digestão", "dinâmica", "encantar", "entrevista", "diagrama", "planeta", "cartazes", "caminhos", "trilhas",
    // 10 letras (30 palavras)
    "abandonado", "abominável", "absorvente", "acidental", "acolhimento", "acrobacias", "adaptativo", "admissível", "adolescente", "advertência",
    "aglomerado", "agricultor", "ambulância", "analgésico", "apaixonado", "aplicativo", "apropriado", "arqueólogo", "assinaturas", "astronomia",
    "atendimento", "atravessar", "autenticado", "automatizar", "avaliativo", "aventurado", "biblioteca", "brincadeira", "caminhando", "campeonato"
  ],

  hard: [
    // Palavras extras foram adicionadas para totalizar 60
    "pneumoultramicroscopicossilicovulcanoconiótico", "anticonstitucionalissimamente",
    "oftalmotorrinolaringologista", "inconstitucionalissimamente",
    "otorrinolaringologista", "dermatopatologista", "eletroencefalografista",
    "gastroenterocolite", "hipopotomonstrosesquipedaliofobia", "esternocleidomastoideo",
    "interdisciplinaridade", "desoxirribonucleico", "contrarrevolucionário",
    "internacionalização", "constitucionalidade", "imunossupressivamente",
    "neuropsicofarmacologia", "psicofarmacologicamente", "eletrocardiograficamente",
    "magnetoencefalográfico", "inconstitucionalizadíssimo", "superextraordinaríssimo",
    "subinconstitucionalidade", "pluridimensionalidade", "desinstitucionalização",
    "antidesestabilização", "infraestruturacionalismo", "policarboximetilcelulose",
    "antropomorfologicamente", "intertransdisciplinaridade", "hiperparatireoidismo",
    "ultramicroscopicamente", "heterossexualissimamente", "transcendentalisticamente",
    "superinconstitucionalidade", "eletroencefalograficamente", "antropocentricamente",
    "incomunicabilidade", "insubstancialidade", "multidimensionalidade",
    "psiconeuroimunologia", "fisiopatologicamente", "esternocleidomastoidite",
    "desproporcionalidade", "magnetoeletricidade", "constitucionalisticamente",
    "ultrarrevolucionariamente", "politicamenteincorretíssimo", "intercontinentalidade",
    "contrarrevolucionaríssimo", "hipercalorificamente", "hipopotomonstrosesquipedaliofóbico",
    "transdisciplinaridade", "multiprofissionalidade", "imprevisivelmente",
    "extraordinariamente", "desproporcionadíssimo", "interoperacionalidade"
  ]
};

function final() {
  
  input.value = ""
  letreiroPlayer.innerHTML = ""
  clearInterval(interval)
  
  document.body.innerHTML = ""

  
  const finalDiv = document.createElement('div');
  const pontos = document.createElement('div');
  const pG = document.createElement('h1');
  const tempo = document.createElement('div');
  const bnts = document.createElement('div');
  const restart = document.createElement('button');
  const inicio = document.createElement('button');
  
 const cronometro = templatCronometro.textContent

  finalDiv.id = 'final';
  bnts.id = 'btnsTemplFinal'
  
  
  restart.textContent = 'reinicio';
  inicio.textContent = 'início';
  tempo.textContent = `Seu tempo: ${cronometro}`;
  pG.textContent = 'Você'+ (perdeu?' Ganhou':'Perdeu');
  pontos.textContent = `Seus pontos: ${palavrasAcertadas}`;

  const botoesFinal = [restart, inicio].forEach(bnt => {
    bnt.classList.add('btnsfinal');
    bnts.appendChild(bnt);
    
    
  });
  
  restart.addEventListener('click', () => {
    
    yAtual = 0
    templatCronometro.textContent = '00:00:00'
    palavrasAcertadas=0
    decremento = 1
    hrs=0,mnts=0,segs=0
    cabou=false
    
    document.body.innerHTML = ""
    
    document.body.appendChild(div1);
    jogo(div1, document.body);
  });

  inicio.addEventListener('click', () => {
    
    
    yAtual = 0
    decremento = 1
    templatCronometro.textContent = '00:00:00'
    palavrasAcertadas=0
    hrs=0,mnts=0,segs=0
    cabou=false
    
    document.body.innerHTML = ""
    
    comeco(div1);
  });

  const elementosFinal = [pG, pontos, tempo, bnts].forEach(el => {
    finalDiv.appendChild(el);
  });

  document.body.appendChild(finalDiv);
}

function attCronometro() {
  
  return `${String(hrs).padStart(2,'0')}:${String(mnts).padStart(2,'0')}:${String(segs).padStart(2,'0')}`
}

function cronometrar() {
  
  clearInterval(interval)
  
  interval = setInterval(()=>{
   
    segs++
    
    if (segs==0 || segs == 30) {
      
      decremento++
      
    }
   
    if (segs==60) {
    
      segs=0
      mnts++
      
    
    }
  
    if (mnts===60) {
    
      mnts=0
      hrs++
    
    }
   
    templatCronometro.textContent = attCronometro()
    
  },1000)
  
}

function random(tamanho){
  
  let x=0, ultimoX;
  
  ultimoX=x

  do{
    x = Math.floor(Math.random() * tamanho)
  }while (x==ultimoX);
  
  return x

}

function comeco(menuDificuldade) {
  
  document.body.style.background = 'url(./imgs/lava_expo.gif) no-repeat';
  document.body.style.backgroundPositionX = 'center';
  document.body.style.backgroundPositionY = '100%';
  document.body.style.backgroundSize = '100dvw';
  
  const titulo = document.createElement('h1')
  
  const hard = document.createElement('button');
  const dificil = document.createElement('button');
  const medio = document.createElement('button');
  const facil = document.createElement('button');
  const div = document.createElement('div')

  div.style.gap = `${rem}px`
  div.style.width = "100%"
  div.style.display = 'flex'
  div.style.justifyContent = "center"
  
  menuDificuldade.setAttribute('id','menuDificuldade');
  
  titulo.textContent = 'Sua escolha é: ';
  
  [dificil,medio,facil].forEach( bnt => {
    
    bnt.classList.add("dificuldades")
    div.appendChild(bnt)
     
  });
  
  hard.id = 'hard'
  hard.dataset.nome = 'hard'
  hard.textContent= 'hard?'
  hard.classList.add('dificuldades')
  
  dificil.dataset.nome = 'dificil'
  dificil.textContent= 'difícil'
  
  medio.dataset.nome = 'medio'
  medio.textContent = 'médio'
  
  facil.dataset.nome = 'facil'
  facil.textContent = 'fácil'
  
  
  menuDificuldade.appendChild(hard)
  menuDificuldade.appendChild(titulo);
  menuDificuldade.appendChild(div);
  
  document.body.appendChild(menuDificuldade);
  
  
}

function caindo() {
    
    yAtual += decremento
    
    pessoa.style.backgroundImage = 'url(./imgs/caindo.png)'
    
    const posicaoPessoa = pessoa.getBoundingClientRect()
    
    const posicaoLava = div1.getBoundingClientRect()
  
  let caiuNaLava = posicaoPessoa.bottom >= posicaoLava.top + (1*rem)
    
    pessoa.style.transform = `translateY(${yAtual}px)`
    
    if(!caiuNaLava ){
      
      animframe = requestAnimationFrame(caindo)
      
    }
    else {
      
      perdeu = true
      cabou = true
      cancelAnimationFrame(animframe)
    
      pessoa.style.backgroundImage = 'url(./imgs/explosao.gif)'
      
      setTimeout(()=>{pessoa.remove()
      final()
      
      },1000)
      
      return
      
    }
  }
  
function subir() {
   
   
   let Destino = yAtual-100

   const posicaoPessoa = pessoa.getBoundingClientRect()
   
   const teto = document.body.getBoundingClientRect().top + window.scrollY;

        
   let saiudaTela = posicaoPessoa.top <= teto
   
   function subindo() {
     
     yAtual -= 1
     pessoa.style.backgroundImage= 'url(./imgs/voando.gif)'
     pessoa.style.transform = `translateY(${yAtual}px)`
     
     pessoa.animate([{         transform: `translateX(-5px)` },
        { transform: `translateX(5px)` },
        { transform: `translateX(-5px)` },
        { transform: `translateX(5px)` },
        { transform: `translateX(-5px)` },
        { transform: `translateX(5px)` }
      ], {
        duration: 1,
        composite:'add',
      })


     if(saiudaTela){
      cabou=true
      perdeu = false
      final()

      return
     }



     if (yAtual > Destino) {
       
       animframe=requestAnimationFrame(subindo)
       
     } else {
       
       cancelAnimationFrame(animframe)
       caindo()
       
     }

     
   }
   
   subindo()
   
  }

function attLetreiro (){
    
    letreiroPalavra.innerHTML = ""
    palavra.textContent = "";
    
    let letrasCertaDivs = Array.from(document.getElementsByClassName('Certa'))
    
    letrasCertaDivs.forEach(el => el.remove());
    
     palavra.textContent = palavraDificuldade[random(60)];

    for (const letra of palavra.textContent) {
      const divLetras = document.createElement("div");
      divLetras.textContent = letra;
      divLetras.classList.add('Letra','Certa')
      letreiroPalavra.appendChild(divLetras);
    }
    
    let letrasCertaQ = document.getElementsByClassName('Certa').length
    
    letreiroPalavra.style.gridTemplateColumns=`repeat(${letrasCertaQ},1fr)`
    
    
  }

input.addEventListener("keypress", (e) => {

    const char = e.key;
    if (!/^[a-zA-Zà-úÀ-ÚçÇ]+$/.test(char)) {
      e.preventDefault();
    }

    if (e.key === "Enter") {
  
      e.preventDefault();    
      if(palavra.textContent.toLowerCase() == input.value.toLowerCase() && !cabou){

        subirvezes = 0
        palavrasAcertadas++
        cancelAnimationFrame(animframe)
        subir()
      

      }
        

      input.value = ""


      while( letreiroPlayer.children.length > input.value.length ){ 

        letreiroPlayer.removeChild(letreiroPlayer.lastChild)
        quantidade--

      }
      
      attLetreiro()
    
    }
  });

input.addEventListener("input",() =>{


    
    const texto = input.value.replace(/[^a-zA-Zà-úÀ-ÚçÇ]/g, "")
    
    
    while(letreiroPlayer.children.length < texto.length) {
        const div = document.createElement("div");
        div.classList.add("letra");
        letreiroPlayer.appendChild(div);
        quantidade++
    }
  
    while( letreiroPlayer.children.length > texto.length ){ 

      letreiroPlayer.removeChild(letreiroPlayer.lastChild)
      quantidade--

    }

    for (let i = 0; i < texto.length; i++) {
      letreiroPlayer.children[i].textContent = texto[i].toLowerCase();
    }

    letreiroPlayer.style.gridTemplateColumns = `repeat(${quantidade},1fr)`
    
  })
  
letreiroPalavra.style.gridTemplateColumns = `repeat(${palavra.textContent.length},1fr)`

function jogo(lava,parede){
  
  document.body.style.background = '';
  

  letreiroPlayer.id = 'letreiroPlayer'
  letreiroPalavra.id = "letreiroPalavra";
  lava.id = 'lava'
  parede.id = 'parede'
  pessoa.id = 'pessoa'
  
  
  parede.appendChild(letreiroPalavra)
  parede.appendChild(letreiroPlayer)
  parede.appendChild(input)
  input.value = ''
  parede.appendChild(pessoa)
  parede.appendChild(lava)
  
  const elementosJogo = [letreiroPalavra,letreiroPlayer,input,pessoa,lava,templatCronometro].forEach(el => {
    
    parede.appendChild(el)
    
  })

  cronometrar()
  caindo(lava)
  attLetreiro()
  input.focus()
  
}

div1.addEventListener('click',(click) =>{
  
  const clicado = click.target.closest('.dificuldades')
  
  const controle = div1.id === 'menuDificuldade';
  
  if(!clicado || !controle || cooldown)
    return;
    
  cooldown = 
    
  dificuldadeSelecionada = clicado.dataset.nome
  
  animacao = div1.animate([{opacity: "1"},{opacity: '0'}],{
    
    duration: 3000,
    easing: 'linear'
    
  })
  
  animacao.finished.then(() => {
    
    div1.replaceChildren();
    div1.removeAttribute('id')
    setTimeout(() => cooldown=false,2000)
    
    palavraDificuldade = palavrasCertas[dificuldadeSelecionada]
  
    jogo(div1,document.body)
    
  })
  
} )

//final()
comeco(div1);
//jogo(div1,document.body)

