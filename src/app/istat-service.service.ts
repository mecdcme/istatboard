import { Injectable } from '@angular/core';
import { Point } from './classes/Point';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IstatServiceService {
  private distancesUrl = 'http://localhost:8080/points';
  constructor(private http: HttpClient) { }

  getPointsLocal(np: number): Point[] {
    let arr_nitems: Point[] = [];
    for (let index = 0; index < np; index++) {
       let p= new Point(index,Math.floor((Math.random() * 100) + 1));
       arr_nitems[index]=p;
    }

    return arr_nitems;
  };

  getPointsRemote(np: number): Observable<Point[]> {
    console.log('getPointsRemote');
   return this.http.get<Point[]>(this.distancesUrl+'/'+np);
  };
}
