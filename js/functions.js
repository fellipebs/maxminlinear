// Declarando matriz inicial
var matriz = [];

function processar(){

    var Zx = $('#Zx').val();
    var Yx = $('#Yx').val();

    if(Zx == "" || Yx == ""){
        alert('Favor, preencha todos os campos corretamente.');
    }else if($('#metodo').val() == '1'){
        maximizacao();
    }else{
        minimizacao();
    }
}

function maximizacao(){ // Função para processo de maximização

    //Numero de equações.

    var linhas = validaNumLinhas();
    
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


    vezesRodou = 0;
    // Começar o laço aqui
    //Imprimindo a tabela atual
    imprimir(matriz, linhas);

    while(paraLoopMaximizacao(matriz[matriz.length-1],vezesRodou)){ // Passando linha Z como parametro e vezes que rodou.
        
        //Escolhendo o termo de menor valor na linha z
        var valorminimo = Math.min(...matriz[linhas]);
        imprimirTexto("O menor valor da coluna Z é " + valorminimo.toFixed(2) + ", sua coluna foi escolhida.");

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

        // Loop para escrever a linha
        for(var i = 0; i < matriz[indiceLinha].length; i++){
            textoLinha += "  "+(matriz[indiceLinha][i]).toFixed(2);
        }

        //Imprimindo linha que será utilizada
        imprimirTexto(textoLinha);

        //Escolhendo o pivô
        var pivo = matriz[indiceLinha][indice];
        imprimirTexto("O pivô escolhido é: " + pivo.toFixed(2));

        //Modificando a linha do pivô
        for(var i = 0; i < matriz[indiceLinha].length; i++){
            matriz[indiceLinha][i] = matriz[indiceLinha][i]/pivo;
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

        //Fim do loop
        //Imprimindo a tabela atual
        imprimir(matriz, linhas);
        vezesRodou++; // Controlador para evitar loop infinito
    }

    if(vezesRodou < 49){
        var textoFinal = "";
        for(var i = 0; i < matriz.length; i++){
            if(matriz[i][0] == 1){
                textoFinal += "X é: "+ matriz[i][linhas + 2].toFixed(2)+"\n";
            }

            if(matriz[i][1] == 1){
                textoFinal += "  Y é: "+ matriz[i][linhas + 2].toFixed(2) + "\n";
            }
        } 
        textoFinal += "  Z é: "+ matriz[matriz.length - 1][linhas + 2].toFixed(2) + "\n";

        imprimirTexto(textoFinal);
    }
}

function minimizacao(){ // Função para processo de minimização

    //Numero de equações.
    var linhas = validaNumLinhas();
    
    // Declarando matriz inicial
    matriz = [];

    //Populando matriz com os valores iniciais
    for(var i = 0; i < linhas; i++){

        matriz[i] = [];
        aux = 0; // Variavel de controle

        for(var j = 0; j < linhas + 3; j++){ // linhas + 3, pois é o valor de equações + x,y e RS

            if(j == 0) //Popular o X 
                matriz[i][j] = parseFloat($('#X'+(i+1)).val()) * - 1;
            else if(j == 1) //Popular o Y
                matriz[i][j] = parseFloat($('#Y'+(i+1)).val()) * - 1;
            else if(j == linhas + 2){
                matriz[i][j] = parseFloat($('#RS'+(i+1)).val()) * - 1;   
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
    matriz[linhas][0] = parseFloat($('#Zx').val()); // Multiplicando por -1 para mudar o sinal
    matriz[linhas][1] = parseFloat($('#Yx').val());
    for(var i = 0; i <= linhas; i++){
        matriz[linhas][i + 2] = 0;
    }
    //Fim população inicial


    vezesRodou = 0;
    // Começar o laço aqui
    //Imprimindo a tabela atual
    imprimir(matriz, linhas);

    while(paraLoopMinizacao(matriz,vezesRodou)){ // Passando linha Z como parametro e vezes que rodou.

    //Escolhendo o termo de menor valor na linha RS
    var valorminimo = Number.MAX_VALUE; // Variavel que guardará o valor minimo 
    var linhaminimo = ""; // Linha que será a escolhida
    for(var i = 0; i < matriz.length - 1; i++){
        if(matriz[i][matriz[0].length - 1] < valorminimo){
            valorminimo = matriz[i][matriz[0].length - 1];
            linhaminimo = i;
        } 
    }
    imprimirTexto("O menor valor da coluna RS é " + valorminimo.toFixed(2) + ", sua linha foi escolhida.");

    // criando vetor que irá receber os valores divididos
    var vetAux = [];

    for(var i = 0; i < matriz[linhaminimo].length; i++){
        if(matriz[linhaminimo][i] == 0 )
            vetAux.push(0);
        else{
            // forçando o resultado a ser sempre prositivo
            resultado = matriz[matriz.length - 1][i] / matriz[linhaminimo][i];
            if(resultado < 0)
                resultado = resultado * - 1;

            vetAux.push(resultado); // jogando resultados em vetor auxiliar
        }
    }

  
    //For para saber o indice do menor resultado
    var indiceColuna = "";
    var valorminimo2 = Number.MAX_VALUE; // Variavel que guardará o valor minimo 
    for(var i = 0; i < vetAux.length; i++){
        if(vetAux[i] < valorminimo2 && vetAux[i] != 0){
            valorminimo2 = vetAux[i];
            indiceColuna = i;
        }
    }

    var textoLinha = "A coluna escolhida ("+ (indiceColuna+1) +") é: \n";

    // Loop para escrever a linha
    for(var i = 0; i < matriz.length; i++){
        textoLinha += "  "+(matriz[i][indiceColuna]).toFixed(2)+"\n";
    }

    //Imprimindo a coluna que será utilizada
    imprimirTexto(textoLinha);

    //Escolhendo o pivô
    var pivo = matriz[linhaminimo][indiceColuna];
    imprimirTexto("O pivô escolhido é: " + pivo.toFixed(2));

    //Modificando a linha do pivô
    for(var i = 0; i < matriz[linhaminimo].length; i++){
        matriz[linhaminimo][i] = matriz[linhaminimo][i]/pivo;
    }

    //Imprimindo matriz após modificar a linha do pivô
    imprimir(matriz, linhas);

    var pivo = matriz[linhaminimo][indiceColuna];
    imprimirTexto("Pivô após contas é: " + pivo);

    // valor base da linha que será utilizado para a conta.
    var valorbase;
    //Modificando as demais linhas
    for(var i = 0; i < linhas + 1; i++){
        var valorbaseaux = matriz[i][indiceColuna];
        if (i != linhaminimo){
            for(var j = 0; j < linhas + 3; j++){ 
                valorbase = matriz[linhaminimo][j]; // Valor da linha que já foi modificada
                matriz[i][j] = matriz[i][j]-(valorbaseaux*valorbase); //Adicionando novo valor na matriz, já calculado
            }
        }
    }

    //Fim do loop
    //Imprimindo a tabela atual
    imprimir(matriz, linhas);
    vezesRodou++; // Controlador para evitar loop infinito

    }

    if(vezesRodou < 49){
        var textoFinal = "";
        for(var i = 0; i < matriz.length; i++){
            if(matriz[i][0] == 1){
                textoFinal += "X é: "+ matriz[i][linhas + 2].toFixed(2)+"\n";
            }

            if(matriz[i][1] == 1){
                textoFinal += "  Y é: "+ matriz[i][linhas + 2].toFixed(2) + "\n";
            }

            if(i == matriz.length - 1){
                zfinal = matriz[i][matriz[0].length - 1];
                if(zfinal < 0)
                    zfinal = zfinal * -1;


                textoFinal += "  Z é: "+ zfinal.toFixed(2) + "\n"; 
            }
        } 

        imprimirTexto(textoFinal);
    }

}

// Imprime a Matriz do sistema por completo!
function imprimir(matriz, linhas){ // Função para imprimir a matriz

    $('#resultado').html($('#resultado').html() + "Resultados até o momento: \n");

    for(var i = 0; i < matriz.length; i++){
        for (var j = 0; j < matriz[i].length; j++){
            $('#resultado').html($('#resultado').html() + "  " + (matriz[i][j]).toFixed(2) + "  ");
        }
        $('#resultado').html($('#resultado').html() + "\n");
    }

    $('#resultado').html($('#resultado').html() + "-----------------------------------------------------------------------------------------------------------------\n");

}

// Imprime qualquer texto no box de resultado
function imprimirTexto(texto){
    $('#resultado').html($('#resultado').html() + "  " + texto + "  ");
    $('#resultado').html($('#resultado').html() + "\n-----------------------------------------------------------------------------------------------------------------\n");
}

// Método bool para parar o loop, entre com a linha Z e ele retornará se existem valores negativos - Maximização
function paraLoopMaximizacao(matriz, vezesRodou){
    if(vezesRodou > 49){
        imprimirTexto("A função 50 vezes, por isso a execução será abortada, evitando loop infinito.");
        return false;
    }    

    for(var i = 0; i < matriz.length; i++){
        if(matriz[i] < 0)
            return true;
    }

    return false;
}

// Método bool para parar o loop, entre com a matriz e ele retornará se a coluna RS possui valores negativos - Minimização
function paraLoopMinizacao(matriz, vezesRodou){
    if(vezesRodou > 49){
        imprimirTexto("A função 50 vezes, por isso a execução será abortada, evitando loop infinito.");
        return false;
    }    

    for(var i = 0; i < matriz.length - 1; i++){
        if(matriz[i][matriz[0].length - 1] < 0){
            return true;
        } 
    }

    return false;
}

function validaNumLinhas(){
    var numlinhas = 0;
    var x1 = $('#X1').val();
    var y1 = $('#Y1').val();
    var RS1 = $('#RS1').val();

    if(x1 != "" || y1 != "" || RS1 != "")
        numlinhas++;

    var x2 = $('#X2').val();
    var y2 = $('#Y2').val();
    var RS2 = $('#RS2').val();

    if(x2 != "" || y2 != "" || RS2 != "")
        numlinhas++;

    var x3 = $('#X3').val();
    var y3 = $('#Y3').val();
    var RS3 = $('#RS3').val();

    if(x3 != "" || y3 != "" || RS3 != "")
        numlinhas++;

    return numlinhas;
}