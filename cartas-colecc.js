// En este juego habrá dos tipos diferentes de Cartas: Unidades y Efectos.
// Las unidades se jugarán para obtener el control del tablero y lucharán con las unidades jugadas por un oponente.
// Los efectos requieren que una Unidad sea apuntada para poder jugar.

class Card {
  constructor(name, cost) {
    this.name = name;
    this.cost = cost;
  }
}

class Unit extends Card {
  constructor(name, cost, power, res) {
    super(name, cost);
    this.power = power;
    this.res = res;
  }
  // las "Unidades" pueden atacar a otras "Unidades", cuando lo hacen disminuyen la "resistencia" del objetivo por el "poder" del atacante.
  attack(target) {
    return (target.res -= this.power);
  }
}

class Effect extends Card {
  constructor(name, cost, stat, magnitud) {
    super(name, cost);
    this.magnitud = magnitud;
    this.stat = stat;
    this.magnitudValue = Number(magnitud.split("")[1]);
    this.operation = magnitud.split("")[0];
  }
  decreasePow(target) {
    return (target.power -= this.magnitudValue);
  }
  decreaseRes(target) {
    return (target.res -= this.magnitudValue);
  }
  increasePow(target) {
    return (target.power += this.magnitudValue);
  }
  increaseRes(target) {
    return (target.res += this.magnitudValue);
  }
  play(target) {
    if (target instanceof Unit) {
      if (this.operation == "+") {
        console.log(
          `Aumentar ${this.stat} del objetivo en ${this.magnitudValue}`
        );
        return this.stat === "power"
          ? this.increasePow(target)
          : this.increaseRes(target);
      } else {
        console.log(
          `Disminuir ${this.stat} del objetivo en ${this.magnitudValue}`
        );
        return this.stat === "power"
          ? this.decreasePow(target)
          : this.decreaseRes(target);
      }
    } else {
      throw new Error("Target must be a unit!");
    }
  }
}

const ninjaRojo = new Unit("Ninja Cinturón Rojo", 3, 3, 4);
const ninjaNegro = new Unit("Ninja Cinturón Negro", 4, 5, 4);

const algoritmoDificil = new Effect("Algoritmo Difícil", 2, "res", "+3");
const rechazoPromesa = new Effect(
  "Rechazo de promesa no manejado",
  1,
  "res",
  "-2"
);
const progPareja = new Effect("Programación en pareja", 3, "power", "+2");

console.log("Turno 1: jugador 1 convoca a 'ninja cinturón rojo',", ninjaRojo);
console.log("El jugador 1 juega 'Algoritmo duro' en 'ninja cinturón rojo'");
algoritmoDificil.play(ninjaRojo);
console.log("Ninja Rojo actualizado: ", ninjaRojo);

console.log("");
console.log("Turno 2: jugador 2 convoca a 'ninja cinturón negro',", ninjaNegro);
console.log(
  "El jugador 2 juega 'Rechazo de promesa no controlada' en 'ninja cinturón rojo'"
);
rechazoPromesa.play(ninjaRojo);
console.log("Ninja Rojo actualizado: ", ninjaRojo);

console.log("");
console.log(
  "Turno 3: jugador 1 juega 'programación en pareja' en 'ninja cinturón rojo'"
);
progPareja.play(ninjaRojo);
console.log("Ninja Rojo actualizado: ", ninjaRojo);

console.log("");
console.log("Turno 4: ninja rojo ataca a ninja negro");
ninjaRojo.attack(ninjaNegro);
console.log("Ninja negro actualizado", ninjaNegro);
