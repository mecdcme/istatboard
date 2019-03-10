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

  

   
   getReportList(source:string): Observable<string[]> {
    console.log(this.distancesUrl+'/report/list')
    return this.http.get<string[]>(this.distancesUrl+'/report/list/'+source).map((responseData) => responseData);;
   };

   getGenericReport(reportId:number,q_type:string,params:string):Observable<string[]> {
    console.log(this.distancesUrl+ reportId)
    return this.http.get<string[]>(this.distancesUrl+'/'+q_type+'/report/'+reportId+'/'+params).map((responseData) => responseData);;
   };

   getClsValues(stringa:string):Observable<string[]> {
    console.log(this.distancesUrl+ stringa)
      return this.http.get<string[]>(this.distancesUrl+'/cls/values/'+stringa ).map((responseData) => responseData);;
   };


   // PIVOT 
   getPivotList(source:string): Observable<string[]> {
    console.log(this.distancesUrl+'/pivot/list')
    return this.http.get<string[]>(this.distancesUrl+'/pivot/list/'+source).map((responseData) => responseData);;
   };

   getPivotData(pivotId:number):any {
    console.log(this.distancesUrl+'/pivot/'+pivotId)
    return  this.http.get(this.distancesUrl+'/pivot/'+pivotId)
    .toPromise()
    .then((data: any) => {
        return {
            data: data
        }
    })
    .catch(error => { throw 'Data Loading Error' });
   };

   getGenericPivot(reportId:number,q_type:string,params:string):Observable<string[]> {
    console.log(this.distancesUrl+ reportId)
    return this.http.get<string[]>(this.distancesUrl+'/'+q_type+'/pivot/'+reportId+'/'+params).map((responseData) => responseData);;
   };

   getFoodList(status:number):Observable<string[]> {
    console.log(this.distancesUrl+'/food/'+status)
    return this.http.get<string[]>(this.distancesUrl+'/food/'+status ).map((responseData) => responseData);;
   };

   getFoodLists( ):Observable<string[]> {
    console.log(this.distancesUrl+'/foodfiles/');
    return this.http.get<string[]>(this.distancesUrl+'/foodfiles/' ).map((responseData) => responseData);;
   };
  }
