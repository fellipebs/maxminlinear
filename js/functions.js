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

function maximizacao(){ // Função para processo de maximização

    //Numero de equações.
    var linhas = 3;
    
    // Declarando matriz inicial
    matriz = [];

    //Populando matriz com os valores iniciais
    for(var i = 0; i < linhas; i++){

        matriz[i] = [];
        aux = 0; // Variavel de controle

        for(var j = 0; j < linhas + 3; j++){ // linhas + 3, pois é o valor de equações + x,y e RS

            if(j == 0) //Popular o X 
                matriz[i][j] = parseFloat($('#X'+(i+1)).val());
            else if(j == 1) //Popular o Y
                matriz[i][j] = parseFloat($('#Y'+(i+1)).val());
            else if(j == linhas + 2){
                matriz[i][j] = parseFloat($('#RS'+(i+1)).val());   
            }else{

                if(aux != i){ // Preenchendo os valores adicionais com 0 e 1 (diagonal principal)
                    matriz[i][j] = 0;   
                }else{
                    matriz[i][j] = 1;   
                }
                aux++;
            }
        }

        aux = 0; // Variavel de controle
    }
    //Fim população inicial

    //Imprimindo a tabela inicial
    imprimir(matriz, linhas);

}

function minimizacao(){ // Função para processo de minimização

}

function imprimir(matriz, linhas){ // Função para imprimir a matriz

    for(var i = 0; i < matriz.length; i++){
        for (var j = 0; j < matriz[i].length; j++){
            $('#resultado').html($('#resultado').html() + "  " + matriz[i][j] + "  ");
        }
        $('#resultado').html($('#resultado').html() + "\n");
    }

    $('#resultado').html($('#resultado').html() + "------------------------------------");


}