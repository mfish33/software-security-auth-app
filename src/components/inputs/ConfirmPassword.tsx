import { checkPassword, MIN_PASSWORD_LENGTH } from "../../utils/shared_utils"

export type ConfirmPasswordProps = {
    password: string
    className?: string
}

export function ConfirmPassword({ password, className = "" }:ConfirmPasswordProps) {
    const { correctLength, hasNumbers, hasCapital } = checkPassword(password)

    return <div className={className}>
        <p><ConfirmIcon done={correctLength}/> Minimum {MIN_PASSWORD_LENGTH} characters</p>
        <p><ConfirmIcon done={hasNumbers}/> Includes number</p>
        <p><ConfirmIcon done={hasCapital}/> Has Capitol</p>
    </div>
}

function ConfirmIcon({done}: {done: boolean}){
    if(done) {
        return <>✅</>
    }
    return <>❌</>
}