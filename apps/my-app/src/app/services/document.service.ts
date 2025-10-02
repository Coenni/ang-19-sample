import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FileItem } from '../models/folder.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getFolders(): Observable<FileItem[]> {
    return this.http.get<FileItem[]>(`${this.apiUrl}/folders`);
  }

  getFolderContents(id: string|null): Observable<FileItem[]> {
    if (id==null) {
      return of([]);
    }
    return this.http.get<FileItem[]>(`${this.apiUrl}/folders/${id}`);
  }
}
