function buscarClima(){
    const apiKey = "8fd29ed8f5f98abfd5a9c3500e18788c";
    const cidade = encodeURIComponent(
        document.getElementById("cidadeInput").value.trim()
    );

    const codigoTempo = {
        200: "Tempestade com chuva leve",
        201: "Tempestade com chuva",
        202: "Tempestade com chuva forte",
        210: "Tempestade leve",
        211: "Tempestade",
        212: "Tempestade forte",
        221: "Tempestade irregular",
        230: "Tempestade com garoa leve",
        231: "Tempestade com garoa",
        232: "Tempestade com garoa forte",
      
        300: "Garoa leve",
        301: "Garoa",
        302: "Garoa forte",
        310: "Garoa leve com chuva",
        311: "Garoa com chuva",
        312: "Garoa intensa com chuva",
        313: "Pancadas de chuva e garoa",
        314: "Pancadas fortes de chuva e garoa",
        321: "Garoa com pancadas",
      
        500: "Chuva leve",
        501: "Chuva moderada",
        502: "Chuva forte",
        503: "Chuva muito forte",
        504: "Chuva extrema",
        511: "Chuva congelante",
        520: "Pancadas leves",
        521: "Pancadas",
        522: "Pancadas fortes",
        531: "Pancadas irregulares",
      
        600: "Neve leve",
        601: "Neve",
        602: "Neve forte",
        611: "Granizo fino",
        612: "Granizo leve",
        613: "Granizo",
        615: "Chuva e neve leve",
        616: "Chuva e neve",
        620: "Pancadas leves de neve",
        621: "Pancadas de neve",
        622: "Pancadas fortes de neve",
      
        701: "Névoa",
        711: "Fumaça",
        721: "Bruma",
        731: "Areia ou poeira no ar",
        741: "Neblina",
        751: "Areia",
        761: "Poeira",
        762: "Cinzas vulcânicas",
        771: "Rajadas de vento",
        781: "Tornado",
      
        800: "Céu limpo",
      
        801: "Poucas nuvens",
        802: "Nuvens dispersas",
        803: "Nublado",
        804: "Encoberto"
      };


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url) //Não traz o resultado imediatamnete, ele promete que vai trazer depois, por isso utilizamos os .then a seguir
        .then(response => { //Quando a API(fetch) responder o .then vai entregar a resposta aqui, o que não é o nosso dado final, é apenas a resposta bruta do servidor
            if (!response.ok) { //Se a resposta for diferente de true, vai lançar um erro para o usuário de que a navegação deu erro
                throw new Error ("Cidade não encontrada");
            }
            return response.json(); //Ele transforma a resposta Json que a API manda e transforma em objeto JavaScript, essa resposta também não é instantânea, por isso outro .then
        })

        .then(data => {
            const agora = data.dt;
            const nascerSol = data.sys.sunrise;
            const porSol = data.sys.sunset;
            const ehDia = agora >= nascerSol && agora <= porSol;

            alterarTema(ehDia);

            const resultado = {
                temperatura: data.main.temp,
                cidade: data.name,
                pais: data.sys.country
            }

            const idClima = data.weather[0].id;

            mostrarTemperatura(resultado);
            mostrarCidade(resultado);
            mostrarIcone(idClima, ehDia);
        })

        .catch(error => {
            alert(error.message);
        });
}

function mostrarTemperatura(resultado){
    const tempElemento = document.getElementById("tempAtual");
    tempElemento.innerText = `${resultado.temperatura}°C`;
}

function mostrarCidade(resultado){
    const cidadeElemento = document.getElementById("cidadeNome");
    cidadeElemento.innerText = `${resultado.cidade}, ${resultado.pais}`;
}

function mostrarIcone(idClima, ehDia){
    const icone = document.getElementById("iconeClima");

    if(ehDia){
        switch(true){
            case (idClima >= 200 && idClima <= 232) :
                icone.src = "imagens/Tempestade-Grande.png";
            break;
            
            case (idClima >= 300 && idClima <= 321) :
                icone.src = "imagens/Chuva-Grande.png";
            break;

            case (idClima >= 500 && idClima <= 531) :
                icone.src = "imagens/Chuva-Grande.png";
            break;

            case (idClima >= 600 && idClima <= 622) :
                icone.src = "imagens/Nevando-Grande.png";
            break;

            case (idClima >= 701 && idClima <= 781) :
                icone.src = "imagens/Nublado-Grande.png";
            break;

            case (idClima === 800) :
                icone.src = "imagens/Sol-Grande.png";
            break;

            case (idClima >= 801 && idClima <= 804) :
                icone.src = "imagens/Sol-com-nuvens-Grande.png";
            break;

            default :
                icone.src = "imagens/Nublado-Grande.png";
        }
    }else{
        switch(true){
            case (idClima >= 200 && idClima <= 232) :
                icone.src = "imagens/Noite-com-tempestade-Grande.png";
            break;
            
            case (idClima >= 300 && idClima <= 321) :
                icone.src = "imagens/Noite-com-chuva-Grande.png";
            break;

            case (idClima >= 500 && idClima <= 531) :
                icone.src = "imagens/Noite-com-chuva-Grande.png";
            break;

            case (idClima >= 600 && idClima <= 622) :
                icone.src = "imagens/Noite-com-neve-Grande.png";
            break;

            case (idClima >= 701 && idClima <= 781) :
                icone.src = "imagens/Noite-com-nuvens-Grande.png";
            break;

            case (idClima === 800) :
                icone.src = "imagens/Noite-estrelada-Grande.png";
            break;

            case (idClima >= 801 && idClima <= 804) :
                icone.src = "imagens/Noite-com-nuvens-Grande.png";
            break;

            default :
                icone.src = "imagens/Noite-com-nuvens-Grande.png"; 
        }
    }

}

function atualizarData(){
    const hoje = new Date();

    const diasSemana = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"
    ];

    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    const diaSemana = diasSemana[hoje.getDay()];
    const diaNumero = String(hoje.getDate()).padStart(2, '0');
    const mesExtenso = meses[hoje.getMonth()];

    document.getElementById("diaSemana").innerText = diaSemana + ', ';
    document.getElementById("diaNumero").innerText = diaNumero + ' de ';
    document.getElementById("mesExtenso").innerText = mesExtenso;
}

atualizarData();

function alterarTema(ehDia){
    const body = document.body;
    const cards = document.querySelectorAll(".cardPrincipal");
    const button = document.querySelector(".botaoBuscar");

    if(ehDia){
        body.classList.remove("bg-sky-700");
        body.classList.add("bg-sky-300");

        cards.forEach(card => {
            card.classList.remove("bg-sky-600/50");
            card.classList.add("bg-sky-200/50");
        });

        button.classList.remove("bg-sky-800");
        
        button.classList.add("bg-sky-500");

    }else{
        body.classList.remove("bg-sky-300");
        body.classList.add("bg-sky-700");

        cards.forEach(card => {
            card.classList.remove("bg-sky-200/50");
            card.classList.add("bg-sky-600/50");
        });

        button.classList.remove("bg-sky-500");
        button.classList.add("bg-sky-800");
    }
}

