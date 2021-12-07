export class ClientEntity {
    id?: number;
    nomComplet?: string;
    telephone? : string;
    email?: string;
    adresse?: string;

    constructor( _id ?: number, _nomComplet ?: string, _telephone ?: string, _email ?: string , _adresse ?: string ){
        this.id = _id
        this.nomComplet = _nomComplet
        this.telephone = _telephone
        this.email = _email
        this.adresse = _adresse
    }
}