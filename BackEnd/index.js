const express = require('express')
const jsonwebtoken = require('jsonwebtoken')

// const secret = 'minh12345'

// const user = {
//     name: 'minh',
//     org: 'sgroup'
// }

// const jwt = jsonwebtoken.sign(user, secret, {
//     algorithm: 'HS256'
// })
// console.log({ jwt });

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWluaCIsIm9yZyI6InNncm91cCIsImlhdCI6MTY4MTczNjk1NX0.U4tCAJfFYsFG60SccFMpxg9xLtN49eXkitkpe03Gq70'
// const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWluaCIsIm9yZyI6InNncm91cCIsImlhdCI6MTY4MTczNjk1NX0.zVIWskJLDLIE_r_gB9OQafftXqGrzZaTY8R52N3FWoA'
const secret = 'sewy'

const isTokenValid = jsonwebtoken.verify(userToken, secret)
console.log(isTokenValid);
