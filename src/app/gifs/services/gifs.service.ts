import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  constructor( private http: HttpClient) {
    this.loadLocalStorage();
  }

  public gifList: Gif[] = [];
  private _tagHistory: string[] = [];
  private api_key: string = 'uem3uB8VcqeiK5M7Le4PeM29Q61n4IBI';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs'

  get tagsHistory() {
    return [...this._tagHistory]
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if ( this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._tagHistory.unshift(tag);

    this._tagHistory = this._tagHistory.slice(0, 10);

    this.saveLocalStorage();

  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
    localStorage.setItem('gifs', JSON.stringify(this.gifList));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('history')! ); // Ojo en esta linea (al final tiene un signo exclamación)

    if (this._tagHistory.length === 0) return;
    this.searchTag( this._tagHistory[0] );
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.api_key)
    .set('limit', '10')
    .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
    .subscribe( resp => {

      this.gifList = resp.data;

    });
  }

}
