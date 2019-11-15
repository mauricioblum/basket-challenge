export default function validateCard(num) {
  let oddSum = 0;
  let evenSum = 0;
  const numToString = num.toString().split('');
  for (let i = 0; i < numToString.length; i++) {
    if (i % 2 === 0) {
      if (numToString[i] * 2 >= 10) {
        evenSum += numToString[i] * 2 - 9;
      } else {
        evenSum += numToString[i] * 2;
      }
    } else {
      oddSum += parseInt(numToString[i], 10);
    }
  }
  return (oddSum + evenSum) % 10 === 0;
}
