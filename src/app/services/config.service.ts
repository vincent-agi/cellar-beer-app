import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ConfigService {

    public version: string = "0.0.2";

}