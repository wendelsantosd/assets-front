import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAsset } from '../interfaces/Asset';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  private apiUrl = 'http://localhost:3000/assets';

  constructor(private http: HttpClient) {}

  getAssets(): Observable<IAsset[]> {
    return this.http.get<IAsset[]>(this.apiUrl);
  }

  deleteAsset(asset: IAsset): Observable<IAsset> {
    return this.http.delete<IAsset>(`${this.apiUrl}/${asset.id}`);
  }

  createAsset(asset: IAsset): Observable<IAsset> {
    return this.http.post<IAsset>(this.apiUrl, asset);
  }
}
