import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Part } from '../models/part';
import { Material } from '../models/material';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private baseUrl = "https://part-manager-app-default-rtdb.europe-west1.firebasedatabase.app/";
  private materialsUpdated = new BehaviorSubject<void>(null);
  private partsUpdated = new BehaviorSubject<void>(null);
  private partForEdit = new BehaviorSubject<Part | null>(null);

  constructor(private http: HttpClient) {}

  get materialsUpdated$(): Observable<void> {
    return this.materialsUpdated.asObservable();
  }

  

  addMaterial(material: Material) {
    return this.http.post(`${this.baseUrl}/materials.json`, material).pipe(
      tap(() => this.materialsUpdated.next()) 
    );
  }

  getMaterials() {
    return this.http.get<{ [key: string]: Material }>(`${this.baseUrl}/materials.json`);
  }

  deleteMaterial(id: string) {
    return this.http.delete(`${this.baseUrl}/materials/${id}.json`).pipe(
      tap(() => this.materialsUpdated.next()) 
    );
  }
  get partsUpdated$() {
    return this.partsUpdated.asObservable();
  }

  getPartForEdit(): Observable<Part | null> {
    return this.partForEdit.asObservable();
  }

  setPartForEdit(part: Part) {
    this.partForEdit.next(part);
  }

  getParts(): Observable<{ [key: string]: Part }> {
    return this.http.get<{ [key: string]: Part }>(`${this.baseUrl}parts.json`);
  }

  addPart(part: Part): Observable<Part> {
    return this.http.post<Part>(`${this.baseUrl}parts.json`, part).pipe(
      tap(() => this.partsUpdated.next())
    );
  }

  updatePart(part: Part): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}parts/${part.id}.json`, part).pipe(
      tap(() => this.partsUpdated.next())
    );
  }

  deletePart(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}parts/${id}.json`).pipe(
      tap(() => this.partsUpdated.next())
    );
  }

  

  
}
