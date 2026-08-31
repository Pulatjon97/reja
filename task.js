function countLetter(letter, word) {
  let count = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      count++;
    }
  }

  return count;
}

console.log("Aniqlangan harflar soni:", countLetter("a", "Alloh yetishtirmaydigan narsani havas qildirmaydi!"));


//Nima gaaaaaap!? 