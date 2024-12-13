export class Superviseur {
    username: string;
    password: string;
    email: string;
    nom: string;
    sexe: string;
    telephone: string;
    isActif: boolean;
    departement: string;
    role: string;
  
    constructor(
      username: string,
      password: string,
      email: string,
      nom: string,
      sexe: string,
      telephone: string,
      isActif: boolean,
      departement: string,
      role: string
    ) {
      this.username = username;
      this.password = password;
      this.email = email;
      this.nom = nom;
      this.sexe = sexe;
      this.telephone = telephone;
      this.isActif = isActif;
      this.departement = departement;
      this.role = role;
    }
  }