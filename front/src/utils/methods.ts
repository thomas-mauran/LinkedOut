export function starsIntoArray(num: number) {
  let resultArray = [];
  let remaining = num;

  for (let i = 0; i < 5; i++) {
    if (remaining >= 1) {
      resultArray.push(1);
      remaining -= 1;
    } else if (remaining >= 0.5) {
      resultArray.push(0.5);
      remaining -= 0.5;
    } else {
      resultArray.push(0);
      remaining -= 0;
    }
  }

  return resultArray;
}
