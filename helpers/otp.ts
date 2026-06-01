import { authenticator } from 'otplib';

export function otpGenerate(secret: string){
    return authenticator.generate(secret);
}