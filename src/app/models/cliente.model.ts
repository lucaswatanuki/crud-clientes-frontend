import { Endereco } from './endereco.model';
export class Cliente {
  id: number;
  nome: string;
  rg: string;
  cpf: string;
  dataNascimento: Date;
  telefone: string;
  endereco: Endereco;

}
