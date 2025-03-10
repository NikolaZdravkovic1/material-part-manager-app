import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Material } from 'src/app/models/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recent-materials',
  templateUrl: './recent-materials.component.html'
})
export class RecentMaterialsComponent implements OnInit, OnDestroy {
  materials: Material[] = [];
  private updateSubscription: Subscription | null = null;
  isLoading = true;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.fetchMaterials();

    this.updateSubscription = this.firebaseService.materialsUpdated$.subscribe(() => {
      this.fetchMaterials();
    });
  }

  fetchMaterials() {
    this.isLoading = true;
    this.firebaseService.getMaterials().subscribe(
      (response: { [key: string]: Material }) => {
        const materialsArray: Material[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const material = response[key];
            material.id = key;
            materialsArray.push(material);
          }
        }
        this.materials = materialsArray.reverse();
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching materials:', error);
        this.isLoading = false;
      }
    );
  }

  deleteMaterial(id: string) {
    if (confirm('Are you sure you want to delete this material?')) {
      this.firebaseService.deleteMaterial(id).subscribe();
    }
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
