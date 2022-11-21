import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Photo} from "./Models/photo";


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json charset=UTF-8"',

  })
}
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photoURL: string = 'https://jsonplaceholder.typicode.com/photos';

  constructor(
    private http: HttpClient
  ) { }

  getPhotos() {
    return this.http.get<Photo[]>(this.photoURL,httpOptions);
  }


  getPhoto(id: number)
  {
    return this.http.get<Photo>(this.photoURL+'/'+id,httpOptions)
  }

  deletePhoto(photo: number):Observable<void> {
    return this.http.delete<void>(this.photoURL + '/' + photo,httpOptions);
  }

  postPhoto( photo: Photo):Observable<any>{

      const body=JSON.stringify(photo);
      console.log(body)
      return this.http.post(this.photoURL, body, httpOptions);
  }

  putPhoto( photo: Photo):Observable<any>{

    const body=JSON.stringify(photo);

    const url = this.photoURL + '/' + photo.id;

    return this.http.put(url, body, httpOptions);
  }
}
