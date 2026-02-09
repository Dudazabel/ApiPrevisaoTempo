function buscarClima(){
    const apiKey = "8fd29ed8f5f98abfd5a9c3500e18788c";
    const cidade = document.getElementById("cidadeInput").value

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url) //Não traz o resultado imediatamnete, ele promete que vai trazer depois, por isso utilizamos os .then a seguir
        .then(response => { //Quando a API(fetch) responder o .then vai entregar a resposta aqui, o que não é o nosso dado final, é apenas a resposta bruta do servidor
            if (!response.ok) { //Se a resposta for diferente de true, vai lançar um erro para o usuário de que a navegação deu erro
                throw new Error ("Cidade não encontrada");
            }
            return response.json(); //Ele transforma a resposta Json que a API manda e transforma em objeto JavaScript, essa resposta também não é instantânea, por isso outro .then
        })

        .then(data => {
            const resultado = {
                temperatura: data.main.temp
            }
            mostrarTemperatura(resultado);
        })

        .catch(error => {
            alert(error.message);
        });
}

function mostrarTemperatura(resultado){
    const tempElemento = document.getElementById("tempAtual");
    tempElemento.innerText = `${resultado.temperatura}°C`;
}

