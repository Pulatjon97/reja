function countLetter(letter, word) {
  let count = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      count++;
    }
  }

  return count;
}

console.log(
  "Aniqlangan harflar soni:",
  countLetter("a", "Alloh yetishtirmaydigan narsani havas qildirmaydi!"),
);

// TASK - C

function checkContent(str1, str2) {
  // Uzunliklari teng bo'lmasa, harflar soni ham teng bo'lolmaydi
  if (str1.length !== str2.length) {
    return false;
  }

  const count1 = {};
  const count2 = {};

  for (const ch of str1) {
    count1[ch] = (count1[ch] || 0) + 1;
  }

  for (const ch of str2) {
    count2[ch] = (count2[ch] || 0) + 1;
  }

  for (const key in count1) {
    if (count1[key] !== count2[key]) {
      return false;
    }
  }

  return true;
}

// Misollar:
console.log(checkContent("mitgroup", "gmtiprou")); // true
console.log(checkContent("hello", "world")); // false
