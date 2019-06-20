document.querySelector('#close').addEventListener("click", () => {
    document.querySelector('.modal').style.display = 'none';
    document.getElementById('buscar').focus();
    window.location.reload();
});

window.onclick = (event) => {
    if (event.target == document.querySelector('.modal')) {
        document.querySelector('.modal').style.display = 'none';
        document.getElementById('buscar').focus();
        window.location.reload();
    }
}

document.querySelector('#btn_modal').addEventListener("click", () => {
    window.location.reload();
});

$("#buscar").on("input", function(){
    var regexp = /[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g;
    if(this.value.match(regexp)){
      $(this).val(this.value.replace(regexp,''));
    }
  });

  document.querySelector('#search').addEventListener('click', function () {
    document.getElementById('buscar').focus();
  });

function buscarPoke(e) {
    e.preventDefault();
    var city = $('#buscar').val();
    var url = "/pokemons/" + city;
    document.querySelector('.carregando').style.display = 'flex';
    document.querySelector('.resultado').style.display = 'none';
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            if (result.cod == 200) {
                document.querySelector('.carregando').style.display = 'none';
                document.querySelector('.resultado').style.display = 'flex';
                var pokemons = result.pokemons;
                $("#graus").html(result.temp + "°C.");
                $("#cidade").html(city + ".");
                $("#clima").html(result.climate);
                if (result.type == "ice") {
                    $("#tipo").html("Gelo.");
                } else if (result.type == "water") {
                    $("#tipo").html("Água.");
                } else if (result.type == "grass") {
                    $("#tipo").html("Planta.");
                } else if (result.type == "ground") {
                    $("#tipo").html("Terra.");
                } else if (result.type == "bug") {
                    $("#tipo").html("Inseto.");
                } else if (result.type == "rock") {
                    $("#tipo").html("Pedra.");
                } else if (result.type == "fire") {
                    $("#tipo").html("Fago.");
                } else if (result.type == "electric") {
                    $("#tipo").html("Elétrico.");
                } else if (result.type == "normal") {
                    $("#tipo").html("Normal.");
                }
                for (let i = 0; i < pokemons.length; i++) {
                    $("#pokemon" + i).html(pokemons[i].name);
                }
                for (let i = 0; i < pokemons.length; i++) {
                    $("#pokeimg" + i).attr("src", pokemons[i].img);
                }
                document.getElementById("buscar").value = "";
            } else {
                document.querySelector('.modal').style.display = 'flex';
                document.getElementById("buscar").value = "";
            }
            
        }
    });
}