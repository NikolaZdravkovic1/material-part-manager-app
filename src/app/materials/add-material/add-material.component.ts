import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/models/material';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {
  material: Material = this.getEmptyMaterial();
  isEditing: boolean = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getMaterialForEdit().subscribe(material => {
      if (material) {
        this.material = { ...material };
        this.isEditing = true;
      } else {
        this.resetForm(); 
      }
    });
  }

  onSubmit() {
    if (this.isEditing) {
      this.firebaseService.updateMaterial(this.material).subscribe(
        () => {
          console.log('Material updated successfully');
          this.resetForm();
        },
        error => console.error('Error updating material', error)
      );
    } else {
      this.firebaseService.addMaterial(this.material).subscribe(
        () => {
          console.log('Material added successfully');
          this.resetForm();
        },
        error => console.error('Error adding material', error)
      );
    }
  }

  resetForm() {
    this.material = this.getEmptyMaterial();
    this.isEditing = false;
  }

  private getEmptyMaterial(): Material {
    return {
      id: '',
      project: '',
      partNumber: '',
      bomLevel: '',
      description: '',
      typeOfMaterial: '',
      materialSubType: '',
      color: '',
      typeId: ''
    };
  }
}
