// import { Bar } from './interface';
// let x: Bar = { count: 121, x: 3424324};
// console.log(x.count);
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

let box: Box = {height: 5, width: 6, scale: 10};

console.log(box)


interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
  height: number;
}

namespace Animal {
  export let haveMuscles = true;

  export function animalsHaveMuscles() {
      return haveMuscles;
  }
}

namespace Animal {
  export function doAnimalsHaveMuscles() {
      return haveMuscles;  // Error, because haveMuscles is not accessible here
  }
}