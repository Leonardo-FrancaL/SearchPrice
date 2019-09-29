import { Categoria } from './Categoria';

export class Produto {
    id: string;
    nome_produto: string;
    desc_produto: string;
    preco_produto: number;
    especfiEspecificacoes:Array<any>;
    categoria:Categoria;
    linkImg:string;
    linkSite:string;
    picture:any;


    
    
  }