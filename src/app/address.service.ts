import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import {Address} from "./address";


export interface Config {
  heroesUrl: string;
  textfile: string;
}

@Injectable({
    providedIn: 'root'
  })
export class AddressService {

  constructor(private http: HttpClient ) { }

  postUrl = 'https://api.experianaperture.io/address/search/v1';

//   getAddresses() : Observable<any> {
  getAddresses(experienObj): Observable<any> {
    const headers = new HttpHeaders({ 'Auth-Token': '985cd948-3b0d-4860-9204-dfefbbe196de' });
    return this.http.post(this.postUrl, experienObj, { headers });
    // return this.http.post(this.postUrl, experienObj);
  }

  // getCountryName(name: string) {
  //   // console.log('country name', name);
  //   // return name;
  //   return name;
  // }

}
