function outer() {
  const x = 5;
  if (Math.random() > 0.5) {
    const y = 6;
    return () => console.log(x, y);
  }
}

outer()(); // Logs 5 6

// const notSync = async () => {
//   console.log('2')
//   const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('lol');
//     }, 2000);
//   });

//   const str = await p;
//   console.log(str);
// }

// const notSync2 = async () => {
//   console.log('3')
//   const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('lol2');
//     }, 1000);
//   });

//   const str = await p;
//   console.log(str);
// }

// const sync = () => {
//   console.log('1')
//   console.log('lmao');
// }

// const foo = () => {
//   sync();
//   notSync();
//   notSync2();
// }

// foo();