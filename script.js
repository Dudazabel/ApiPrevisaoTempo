function buscarClima(){
    const apiKey = "8fd29ed8f5f98abfd5a9c3500e18788c";
    const cidade = encodeURIComponent(
        document.getElementById("cidadeInput").value.trim()
    );


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

            mostrarTemperatura(resultado);
            mostrarCidade(resultado);
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

