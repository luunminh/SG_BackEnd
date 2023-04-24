const crypto = require('crypto')

const rawPassword = 'sewy'

// Hash password with SHA-512 algorithm
function hashingWithSHA512(input) {
    const output = crypto
        .createHash('sha512')
        .update(input)
        .digest('hex');   //output ra he 16

    return output
}
// const rs = hashingWithSHA512(rawPassword)
// console.log({ rawPassword, rs });


function hashWithRandomSalt(input) {
    const salt = crypto.randomBytes(16).toString('hex')
    const output = crypto.pbkdf2Sync(
        input,
        salt,
        1000,
        64,
        'sha512'
    ).toString('hex')

    return output

}

// const rs2 = hashWithRandomSalt(rawPassword)
// console.log({ rawPassword, rs2 });


// Encryption 

const key = crypto.generateKeyPairSync(
    'rsa',
    { modulusLength: 2048 }
)
const publicKey = key.publicKey
const privateKey = key.privateKey

// encrypt data with public key
const encryptedData = crypto.publicEncrypt(
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
    // we convert the data string to a buffer using 'Buffer.from'
    Buffer.from(rawPassword)
).toString('base64')

console.log({ encryptedData });

// decrypt data with PRIVATE KEY
const decryptedData = crypto.privateDecrypt(
    {
        key: privateKey,
        // in order to decrypt the data. we need tp specify the 
        //same hashing function and padding scheme that we used to 
        //encrypt the data in the previous step
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
    Buffer.from(encryptedData, 'base64')
)
console.log("decrypted data:", decryptedData.toString('utf8'));
