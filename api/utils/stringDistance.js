// const hashCode = (s, lenght) => {
//   lenght = lenght | s.lenght
//   for (var i = 0, h = 0; i < lenght; i++) {
//     h = s[i] * Math.imul(31, h) + s.charCodeAt(i) | 0;
//   }
//   return h
// }

// ##petar
// #012345
// p10
// a21
// t3
// r4
// i5
// k6

export default function distance(s1, s2) {
  if (s1 === undefined || s2 === undefined) return Number.MAX_VALUE

  let d = Array.from({ length: s2.length + 1 }, () => Array(s1.length + 1).fill(0))

  for (let j = 1; j <= s1.length; j++) d[0][j] = j
  for (let i = 1; i <= s2.length; i++) d[i][0] = i

  for (let i = 1; i <= s2.length; i++) {
    for (let j = 1; j <= s1.length; j++) {
      const c1 = s1.charAt(j - 1)
      const c2 = s2.charAt(i - 1)
      if (c1 == c2) {
        d[i][j] = d[i - 1][j - 1]
      } else {
        let dDel = d[i - 1][j]
        let dAdd = d[i][j - 1]
        let dSub = d[i - 1][j - 1]
        d[i][j] = 1 + Math.min(dDel, dAdd, dSub)
      }
    }
  }

  return d[s2.length][s1.length]
}