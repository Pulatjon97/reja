// Task - E
// npm run task

// function getReverse(str) {
//   return str.split("").reverse().join("");
// }

// console.log(getReverse("hello")); // olleh

function getReverse(str) {
  let reversed = str.split("").reverse().join("");

  reversed =
    reversed.charAt(0).toUpperCase() +
    reversed.slice(1, -1) +
    reversed.charAt(reversed.length - 1).toLowerCase();

  return reversed + "😂";
}

console.log(getReverse("Karam")); // Marak😂




// // Task - D
// // npm run task.         <<=========================

// class Shop {
//   constructor(non, lagmon, cola) {
//     this.mahsulotlar = {
//       non: non,
//       lagmon: lagmon,
//       cola: cola,
//     };
//   }

//   // Vaqtni "HH:MM" formatida qaytaradi
//   hozirgiVaqt() {
//     const now = new Date();
//     const soat = now.getHours().toString().padStart(2, "0");
//     const daqiqa = now.getMinutes().toString().padStart(2, "0");
//     return `${soat}:${daqiqa}`;
//   }

//   // 1) Qoldiqni ko'rsatish
//   qoldiq() {
//     const vaqt = this.hozirgiVaqt();
//     const xabar = `Hozir ${vaqt}da ${this.mahsulotlar.non}ta non, ${this.mahsulotlar.lagmon}ta lagmon va ${this.mahsulotlar.cola}ta cola mavjud!`;
//     console.log(xabar);
//     return xabar;
//   }

//   // 2) Sotish - mahsulot miqdorini kamaytiradi
//   sotish(mahsulot, miqdor) {
//     if (this.mahsulotlar[mahsulot] === undefined) {
//       console.log(`Xatolik: "${mahsulot}" degan mahsulot mavjud emas!`);
//       return;
//     }
//     if (this.mahsulotlar[mahsulot] < miqdor) {
//       console.log(`Xatolik: yetarli "${mahsulot}" mavjud emas!`);
//       return;
//     }
//     this.mahsulotlar[mahsulot] -= miqdor;
//     const vaqt = this.hozirgiVaqt();
//     console.log(`Hozir ${vaqt}da ${miqdor}ta ${mahsulot} sotildi!`);
//   }

//   // 3) Qabul qilish - mahsulot miqdorini oshiradi
//   qabul(mahsulot, miqdor) {
//     if (this.mahsulotlar[mahsulot] === undefined) {
//       this.mahsulotlar[mahsulot] = 0;
//     }
//     this.mahsulotlar[mahsulot] += miqdor;
//     const vaqt = this.hozirgiVaqt();
//     console.log(`Hozir ${vaqt}da ${miqdor}ta ${mahsulot} qabul qilindi!`);
//   }
// }

// // Test qilish:
// const shop = new Shop(4, 5, 2);
// shop.qoldiq();        // Hozir HH:MMda 4ta non, 5ta lagmon va 2ta cola mavjud!
// shop.sotish("non", 3);
// shop.qabul("cola", 4);
// shop.qoldiq();        // Hozir HH:MMda 1ta non, 5ta lagmon va 6ta cola mavjud!








// function countLetter(letter, word) {
//   let count = 0;

//   for (let i = 0; i < word.length; i++) {
//     if (word[i] === letter) {
//       count++;
//     }
//   }

//   return count;
// }

// console.log(
//   "Aniqlangan harflar soni:",
//   countLetter("a", "Alloh yetishtirmaydigan narsani havas qildirmaydi!"),
// );

// // TASK - C

// function checkContent(str1, str2) {
//   // Uzunliklari teng bo'lmasa, harflar soni ham teng bo'lolmaydi
//   if (str1.length !== str2.length) {
//     return false;
//   }

//   const count1 = {};
//   const count2 = {};

//   for (const ch of str1) {
//     count1[ch] = (count1[ch] || 0) + 1;
//   }

//   for (const ch of str2) {
//     count2[ch] = (count2[ch] || 0) + 1;
//   }

//   for (const key in count1) {
//     if (count1[key] !== count2[key]) {
//       return false;
//     }
//   }

//   return true;
// }

// // Misollar:
// console.log(checkContent("mitgroup", "gmtiprou")); // true
// console.log(checkContent("hello", "world")); // false
