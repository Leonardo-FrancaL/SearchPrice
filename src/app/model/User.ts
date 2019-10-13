export class Usuario {
    private email:string;
    private senha:string;
    nome:string;

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