import bcrypt from 'bcryptjs'

export async function encrypt(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(text, salt, (err, hash) => {
                resolve(hash)
            })
        })
    })
}
