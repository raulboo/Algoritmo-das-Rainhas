function runAlgorithm(num) {
  console.groupCollapsed(`${num} Peças`);

  // Rainhas sao inicializadas com  X = index(indice na lista) + 1  e  Y = 0
  let queens = Array(num).fill(null).map((val, index) => {return {x : index + 1, y : 0}});

  // Todos os Ys
  let allY = Array(num).fill(null).map((val, index) => index + 1);

  var solutions = [];

  function defineY(currentIndex, possibleValues) {
    for (let i of possibleValues) {

      // É necessário, para cada Y que cada rainha pode assumir, que ela assuma-o
      // ao menos uma vez
      queens[currentIndex].y = i;

      // Se currentIndex é igual a num, significa que esta foi a última peça a
      // ser posicionada, ou seja, obteve-se sucesso ao posicionar 8 peças com
      // as condições devidas
      if (queens[currentIndex].x == num) {

        // Logar todas as coordenadas das rainhas
        solObj = {};
        for (let i = 0; i < num; i++){
          solObj[`P${i+1}`] = JSON.stringify([queens[i].x, queens[i].y]);
        }
        solutions.push(solObj);

      } else {
        let nextIndex = currentIndex + 1;

        // Determinará-se os Ys que a próxima peça NÃO poderá assumir
        let impossibleY = [];

        for (let j = 0; j < nextIndex; j++) {
          // y[k] != y[n]
          impossibleY.push(queens[j].y);
          // (x[k] + y[k]) != (x[n] + y[n]), logo
          // y[k] != x[n] + y[n] - x[k]
          impossibleY.push(queens[j].x + queens[j].y - queens[nextIndex].x);
          //(x[k] - y[k]) != (x[n] - y[n]), logo
          // -y[k] != - y[n] + x[n] - x[k], logo
          // y[k] != y[n] - x[n] + x[k]
          impossibleY.push(queens[j].y - queens[j].x + queens[nextIndex].x);
        }

        // Todos os Ys - Ys impossiveis = Ys possiveis
        let possibleY = allY.filter(val => !(impossibleY.includes(val)));

        defineY(nextIndex, possibleY);
      }
    }

    // Se o loop da primeira Rainha acabar, saberemos que todos os possíveis estados
    // foram checados
    if (currentIndex == 0) {
      console.table(solutions);
      console.log("Feito!");
    }
  }

  // Ao começar, deve-se posicionar a Rainha 1, que já que é a primeira, pode
  // ocupar qualquer Y
  defineY(0, allY);

  console.log(`Soluções totais para ${num} peças: ${solutions.length}`);
  console.groupEnd();
}

for (let n = 0; n < 13; n++) {
    runAlgorithm(n);
}
