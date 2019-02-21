import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../classes/Report';
import 'rxjs/add/operator/map'

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
    return this.http.get(this.distancesUrl+'/report/time').toPromise()
    .then((data: any) => {
    
        return {
            data:data
      ,   }
    })
    .catch(error => { throw 'Data Loading Error' });
   };

  
    
   getTimeReport2(): Observable<string[]> {
    console.log(this.distancesUrl+'/report/time')
    return this.http.get<string[]>(this.distancesUrl+'/report/time').map((responseData) => responseData);;
   };

   getTimeReport3(): Array<any>  {
    console.log(this.distancesUrl+'/report/time')
    return [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
      ];
   };
  
   getTimeReportFile(): Observable<string[]> {
    console.log(this.distancesUrl+'/report/file')
    return this.http.get<string[]>(this.distancesUrl+'/report/file').map((responseData) => responseData);;
   };

   getActivityReport(): Observable<string[]> {
    console.log(this.distancesUrl+'/report/eumainactivityrate/Romania/Males/Work%20and%20Study')
    return this.http.get<string[]>(this.distancesUrl+'/report/eumainactivityrate/Romania/Males/Work%20and%20Study').map((responseData) => responseData);;
   };

   getGenericReport(reportName:String):Observable<string[]> {
    console.log(this.distancesUrl+ reportName)
    return this.http.get<string[]>(this.distancesUrl+'/report/'+reportName).map((responseData) => responseData);;
   };

  }
