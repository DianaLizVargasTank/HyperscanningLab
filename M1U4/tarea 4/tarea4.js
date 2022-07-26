// ejercicio 1 Utilizando lo aprendido escribir el código necesario para que dada una distancia determine el medio de transporte apropiado de acuerdo a las siguientes reglas:

// 0 a 1000 metros = pie
//1000 a 10000 metros = bicicleta
// 10000 a 30000 metros = colectivo
// 30000 a 100000 metros = auto
// +100000 = avión

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

// ejercicio 2 Haciendo uso de los bucles, recorrer un array de números y determinar cual es el mayor 