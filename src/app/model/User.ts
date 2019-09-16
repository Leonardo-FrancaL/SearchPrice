export class Usuario {
    private email:string;
    private senha:string;
    private empresa:string;
    private linkSite:string;

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

    public setEmpresa(emp:string){
        this.empresa = emp;
    }

    public getEmpresa():string {
        return this.empresa;
    }

    public setLinkSite(link:string){
        this.linkSite = link;
    }

    public getLink():string{
        return this.linkSite;
    }
}