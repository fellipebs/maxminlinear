// Declarando matriz inicial
var matriz = [];

function processar(){

    var Zx = $('#Zx').val();
    var Yx = $('#Zx').val();

    var x1 = $('#X1').val();
    var y1 = $('#Y1').val();
    var operacao1 = $('#operacao1').val();
    var RS1 = $('#RS1').val();

    var x2 = $('#X2').val();
    var y2 = $('#Y2').val();
    var operacao2 = $('#operacao2').val();
    var RS2 = $('#RS2').val();

    var x3 = $('#X3').val();
    var y3 = $('#Y3').val();
    var operacao3 = $('#operacao3').val();
    var RS3 = $('#RS3').val();

    if(Zx == "" || Yx == "" ||
       x1 == "" || y1 == "" || operacao1 == "" || RS1 == "" ||
       x2 == "" || y2 == "" || operacao2 == "" || RS2 == "" ||
       x3 == "" || y3 == "" || operacao3 == "" || RS3 == ""){

        alert('Favor, preencha todos os campos corretamente.');

    }else if($('#metodo').val() == '1'){
        maximizacao();
    }else{
        minimizacao();
    }
}

function maximizacao(){

    //Numero de equações.
    var linhas = 3;
    
    // Declarando matriz inicial
    matriz = [];

    //Populando matriz com os valores iniciais
    for(var i = 0; i < linhas; i++){
        matriz[i] = [1,3,1]
    }

}

function minimizacao(){

}
