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

  constructor(private http: HttpClient) {}

  get materialsUpdated$(): Observable<void> {
    return this.materialsUpdated.asObservable();
  }

  get partsUpdated$(): Observable<void> {
    return this.partsUpdated.asObservable();
  }

  addPart(part: Part) {
    return this.http.post(`${this.baseUrl}/parts.json`, part).pipe(
      tap(() => this.partsUpdated.next()) 
    );
  }

  getParts() {
    return this.http.get<{ [key: string]: Part }>(`${this.baseUrl}/parts.json`);
  }

  deletePart(id: string) {
    return this.http.delete(`${this.baseUrl}/parts/${id}.json`).pipe(
      tap(() => this.partsUpdated.next()) 
    );
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
}