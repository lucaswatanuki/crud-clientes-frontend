export class Usuario {
  public id: number;
  public username: string;
  public password: string;

  constructor(id: number, username: string, pwd: string) {
    this.id = id;
    this.username = username;
    this.password = pwd;
  }
}
