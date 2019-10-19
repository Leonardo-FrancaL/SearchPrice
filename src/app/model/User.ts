export class Usuario {
    email:string;
    senha:string;
    nome:string;
    adm:number;
    public  setEmail(mail:string){
        this.email = mail;
    }

    public getEmail():string{
        return this.email;
    }

    public setSenha(pass:string){
        this.senha = pass;
    }

    public getSenha():string{
        return this.senha;
    }
}