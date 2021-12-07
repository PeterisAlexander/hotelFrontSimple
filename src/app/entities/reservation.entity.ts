import { ClientEntity } from "./client.entity";
import { HotelEntity } from "./hotel.entity";

export class ReservationEntity {
    id?: number;
    client?: ClientEntity;
    hotel? : HotelEntity;
    dateDepart?: Date;
    dateFin?: Date;
    numChambre?: number;

    constructor( _id ?: number, _client ?: ClientEntity, _hotel?: HotelEntity,  _dateDepart ?: Date, _dateFin ?: Date, _numChambre ?: number){
        this.id = _id
        this.client = _client
        this.hotel = _hotel
        this.dateDepart = _dateDepart
        this.dateFin = _dateFin
        this.numChambre = _numChambre
    }
}