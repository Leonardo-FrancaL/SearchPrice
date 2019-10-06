import { Categoria } from './Categoria';
import {Oferta} from './Oferta';

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
    ofertas:Array<Oferta>;


    
    
  }