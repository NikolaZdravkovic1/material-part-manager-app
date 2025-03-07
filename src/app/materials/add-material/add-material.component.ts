import { Component } from '@angular/core';
import { Material } from 'src/app/models/material';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent {
  material: Material = {
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

  constructor(private firebaseService: FirebaseService) {}

  onSubmit() {
    this.firebaseService.addMaterial(this.material).subscribe(
      response => {
        console.log('Material added successfully', response);
        this.resetForm();
      },
      error => {
        console.error('Error adding material', error);
      }
    );
  }

  resetForm() {
    this.material = {
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