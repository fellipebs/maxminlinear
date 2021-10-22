// Declarando matriz inicial
var matriz = [];

function processar(){

    var Zx = $('#Zx').val();
    var Yx = $('#Yx').val();

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

    matriz[linhas] = []; // Iniciando fila final para valor de zx e zy
    matriz[linhas][0] = parseFloat($('#Zx').val()) * - 1; // Multiplicando por -1 para mudar o sinal
    matriz[linhas][1] = parseFloat($('#Yx').val()) * - 1;
    for(var i = 0; i <= linhas; i++){
        matriz[linhas][i + 2] = 0;
    }
    //Fim população inicial


    // Começar o laço aqui


    //Imprimindo a tabela atual
    imprimir(matriz, linhas);

    //Escolhendo o termo de menor valor na linha z
    var valorminimo = Math.min(...matriz[3]);
    imprimirTexto("O menor valor da coluna Z é " + valorminimo + ", sua coluna foi escolhida.");

    var indice = matriz[linhas].indexOf(valorminimo); // Indice da coluna que será buscada

    // criando vetor que irá receber os valores divididos
    var vetAux = [];
    for(var i = 0; i < matriz.length - 1; i++){
        vetAux.push(matriz[i][linhas + 2] / matriz[i][indice]);
    }


    //Escolhendo o termo de menor valor na linha z
    var indiceLinha = Math.min(...vetAux);
    indiceLinha = vetAux.indexOf(indiceLinha); // Indice da coluna que será buscada

    var textoLinha = "A linha escolhida ("+ (indiceLinha+1) +") é: ";

    for(var i = 0; i < matriz[indiceLinha].length; i++){
        textoLinha += "  "+matriz[indiceLinha][i];
    }

    //Imprimindo linha que será utilizada
    imprimirTexto(textoLinha);

    //Escolhendo o pivô
    var pivo = matriz[indiceLinha][indice];
    imprimirTexto("O pivô escolhido é: " + pivo);

    //Modificando a linha do pivô
    for(var i = 0; i < matriz[indiceLinha].length; i++){
        matriz[indiceLinha][i] = matriz[indiceLinha][i]/pivo;
        // (.toFixed(2));
    }

    //Imprimindo matriz após modificar a linha do pivô
    imprimir(matriz, linhas);

    var pivo = matriz[indiceLinha][indice];
    imprimirTexto("Pivô após contas é: " + pivo);

    // valor base da linha que será utilizado para a conta.
    var valorbase;
    //Modificando as demais linhas
    for(var i = 0; i < linhas + 1; i++){
        var valorbaseaux = matriz[i][indice];
        if (i != indiceLinha){
            
            for(var j = 0; j < linhas + 3; j++){ 
                valorbase = matriz[indiceLinha][j]; // Valor da linha que já foi modificada
                matriz[i][j] = matriz[i][j]-(valorbaseaux*valorbase); //Adicionando novo valor na matriz, já calculado
            }
        }
    }

    //Imprimindo matriz após modificar todas as linhas
    imprimir(matriz, linhas);
}

function minimizacao(){ // Função para processo de minimização

}

function imprimir(matriz, linhas){ // Função para imprimir a matriz

    $('#resultado').html($('#resultado').html() + "Resultados até o momento: \n");

    for(var i = 0; i < matriz.length; i++){
        for (var j = 0; j < matriz[i].length; j++){
            $('#resultado').html($('#resultado').html() + "  " + matriz[i][j] + "  ");
        }
        $('#resultado').html($('#resultado').html() + "\n");
    }

    $('#resultado').html($('#resultado').html() + "------------------------------------------------------------------------ \n");

}

function imprimirTexto(texto){
    $('#resultado').html($('#resultado').html() + "  " + texto + "  ");
    $('#resultado').html($('#resultado').html() + "\n ------------------------------------------------------------------------ \n");
}