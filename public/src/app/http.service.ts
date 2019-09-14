import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  getCakes() {
    return this._http.get('/cakes');
  }
  getCake(id) {
    return this._http.get('/cakes/' + id);
  }
  createCake(data) {
    return this._http.post('/cakes/create', data);
  }
  updateCake(data) {
    return this._http.put('/cakes/' + data._id, data);
  }
  deleteCake(id) {
    return this._http.delete('/cakes/' + id);
  }
}
