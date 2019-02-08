import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../classes/Report';

@Injectable({
  providedIn: 'root'
})
export class IstatHackService {
  private distancesUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  getReportUserWeek(): Observable<Report[]> {
   console.log(this.distancesUrl+'/report/userweek')
   return this.http.get<Report[]>(this.distancesUrl+'/report/userweek');
  };

  getReportPivotUserWeek(params:String):any {
    return  this.http.get(this.distancesUrl+'/report/userweek'+params)
    .toPromise()
    .then((data: any) => {
    
        return {
            data: data
        }
    })
    .catch(error => { throw 'Data Loading Error' });
   };

   getReportPivotUser(params:String):any {
    return  this.http.get(this.distancesUrl+'/report/'+params)
    .toPromise()
    .then((data: any) => {
    
        return {
            data: data
        }
    })
    .catch(error => { throw 'Data Loading Error' });
   };


 
   getReportPivotUserWeekJoin(params:String):any {
    return  this.http.get(this.distancesUrl+'/report/userweekjoin'+params)
    .toPromise()
    .then((data: any) => {
    
        return {
            data: data
        }
    })
    .catch(error => { throw 'Data Loading Error' });
   };


   getTimeReport(): any {
    console.log(this.distancesUrl+'/report/time')
    return this.http.get<any>(this.distancesUrl+'/report/time').toPromise()
    .then((data: any) => {
    
        return {
            data: data
        }
    })
    .catch(error => { throw 'Data Loading Error' });
   };

  

  }
