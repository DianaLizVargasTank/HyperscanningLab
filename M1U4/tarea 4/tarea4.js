let nombre = prompt('¿Cuál es tu nombre?');
let metros = prompt("Ingresa en metros la distancia que debes recorrer");
let transporte = '';



if (metros > 0 && metros <= 1000) {transporte = 'pie';
} else if (metros > 1000 && metros < 10000) {transporte = 'bicicleta';
} else if (metros > 10000 && metros < 30000) { transporte = 'colectico';
} else if ( metros > 30000 && metros < 100000 ) { transporte = 'auto';
} else if (metros < 100000 ) {transporte = 'avión';
}

alert (nombre + ' te recomiendo que viajes en '+ transporte)
document.write('Hola '+ nombre +', ¿cómo va todo? ')
document.write ('Me dijiste tenías que viajar '+ metros + ' metros' + ' te recomiendo entonces ir en '+ transporte)