function reverse(input) {

  const specials = '%$&';

  // Remove the specials characters and reverse the list
  const reversed = input.filter(c => !specials.includes(c)).reverse();

  const result = [];

  // Insert the specials characters in the result list
  for (const special of specials) {
    result[input.indexOf(special)] = special;
  }

  let i = 0;
  let j = 0;

  // Insert the characters of the reversed list in the result list. 
  // If a character exists in a position of the result list, then skip that position
  while (i < input.length) {
    if (result[i]) {
      i++;
    } else {
      result[i] = reversed[j];
      i++;
      j++;
    }
  }

  return result;
}

const input = ['n', 2, '&', 'a', 'l', 9, '$', 'q', 47, 'i', 'a', 'j', 'b', 'z', '%', 8];
const output = [8, 'z', '&', 'b', 'j', 'a', '$', 'i', 47, 'q', 9, 'l', 'a', 2, '%', 'n'];

const result = reverse(input);

console.log('input:', input.join());
console.log('output:', output.join());
console.log('result:', result.join());
console.log(result.join() === output.join());
