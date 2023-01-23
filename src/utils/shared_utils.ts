export const MIN_PASSWORD_LENGTH = 8

export function checkPassword(password: string) {
    const correctLength = password.length > MIN_PASSWORD_LENGTH
    const hasNumbers = /\d/.test(password);
    const  hasCapital = /[A-Z]/.test(password)

    return {
        correctLength, 
        hasNumbers,
        hasCapital,
        fullyValidated: correctLength && hasCapital && hasNumbers
    }
}