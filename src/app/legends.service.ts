import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from '../../node_modules/rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LegendsService {

  constructor(
    private http: HttpClient
  ) { }

  private legendsURL = 'http://192.168.1.11:6600/geoserver/wms';  // URL to web api



  getLegend(name:string): Observable<Blob>{

    // let res = new HttpParams({
    //   "REQUEST": "GetLegendGraphic",
    //   "VERSION": "1.0.0",
    //   "FORMAT": "image/png",
    //   "WIDTH": "50",
    //   "HEIGHT": "50",
    //   "LAYER": name,
    //   "legend_options": "fontName:Times New Roman",
    //   "bgColor": "0xff12ff",
    //   "fontColor": "0x000033",
    //   "dpi": "180"
    // } as HttpsparamsOptions)



    debugger;
    
    // return this.http.get<Blob>(this.legendsURL,
    //   observe: 'response',
    //   responseType: "blob"
    // }).pipe(
    //     catchError(this.handleError('getLegends', []))
    // );
    return this.http.get<Blob>(this.legendsURL).pipe( );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
  
}

}
