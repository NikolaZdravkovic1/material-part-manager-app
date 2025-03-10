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
  filteredMaterials: Material[] = [];
  selectedField: string = 'partNumber'; 
  searchQuery: string = '';
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
        this.applyFilters();
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching materials:', error);
        this.isLoading = false;
      }
    );
  }

  applyFilters() {
    if (!this.searchQuery.trim()) {
      this.filteredMaterials = this.materials;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    
    this.filteredMaterials = this.materials.filter(material => {
      const fieldValue = material[this.selectedField]?.toString().toLowerCase() || '';
      return fieldValue.includes(query);
    });
  }

  editMaterial(material: Material) {
    this.firebaseService.setMaterialForEdit(material);
  }

  deleteMaterial(id: string) {
    if (confirm('Are you sure you want to delete this material?')) {
      this.firebaseService.deleteMaterial(id).subscribe(() => {
        this.fetchMaterials();
      });
    }
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
