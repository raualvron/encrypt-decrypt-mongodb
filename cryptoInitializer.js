require("dotenv").config();
const crypto = require("crypto");

class CryptoInit {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.key = process.env.PRIVATE_KEY;
        this.iv = crypto.randomBytes(16);
    }

    encryptionData = (message) => {
        // encrypt the string using encryption algorithm, private key and initialization vector
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encryptedData = cipher.update(message, "utf-8", "hex");
        encryptedData += cipher.final("hex");
    
        // convert the initialization vector to base64 string
        const base64data = Buffer.from(this.iv, 'binary').toString('base64');
        return {
            iv: base64data,
            message: encryptedData
        }
    };
    
    decryptedData = (encryptedDataObject) => {
    
       // convert initialize vector from base64 to buffer
       const origionalData = Buffer.from(encryptedDataObject.iv, 'base64');
     
       // decrypt the string using encryption algorithm and private key
       const decipher = crypto.createDecipheriv(this.algorithm, this.key, origionalData);
       let decryptedData = decipher.update(encryptedDataObject.message, "hex", "utf-8");
       decryptedData += decipher.final("utf8");
       return decryptedData;
    }
}

module.exports = CryptoInit;