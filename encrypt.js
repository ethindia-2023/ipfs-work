import {ethers} from "ethers"
import lighthouse from '@lighthouse-web3/sdk'
import kavach from "@lighthouse-web3/kavach"
import {dotenv} from "dotenv"


class EncryptedFile{
    constructor(pathToFile, projectAccount){
        this.pathToFile = pathToFile
        this.projectAccount = projectAccount
    }
    
    async uploadEncrypted(){
        dotenv.config()
        const apiKey = process.env.LIGHTHOUSE_API_KEY
        const privateKey = await this.projectAccount.getPrivateKey()
        const publicKey = await this.projectAccount.getPublicKey()
        const signer = new ethers.Wallet(privateKey)
        const authMessage = await kavach.getAuthMessage(signer.address)
        const signedMessage = await signer.signMessage(authMessage.message)
        const { JWT, error } = await kavach.getJWT(signer.address, signedMessage)
        const response = await lighthouse.uploadEncrypted(this.pathToFile, apiKey, publicKey, signedMessage)
        return(response)
    }
}

export default EncryptedFile