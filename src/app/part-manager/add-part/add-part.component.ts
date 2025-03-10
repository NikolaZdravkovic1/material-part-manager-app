import { Component } from '@angular/core';
import { Part } from 'src/app/models/part';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent {
  part: Part = {
    id: '',
    partNumber: '',
    description: '',
    partColorCode: '',
    custumerPartNumber: '',
    customerColorCode: '',
    project: '',
    partGroup: '',
    partType: '',
    side: '',
    color: '',
    locationIdentifier: ''
  };

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.getPartForEdit().subscribe(part => {
      if (part) {
        this.part = { ...part };
      }
    });
  }

  addPart() {
    this.firebaseService.addPart(this.part).subscribe(
      () => {
        console.log('Part added successfully');
        this.resetForm();
      },
      (error) => {
        console.error('Error adding part:', error);
      }
    );
  }

  editPartSubmit() {
    this.firebaseService.updatePart(this.part).subscribe(
      () => {
        console.log('Part updated successfully');
        this.resetForm();
      },
      (error) => {
        console.error('Error updating part:', error);
      }
    );
  }

  resetForm() {
    this.part = {
      id: '',
      partNumber: '',
      description: '',
      partColorCode: '',
      custumerPartNumber: '',
      customerColorCode: '',
      project: '',
      partGroup: '',
      partType: '',
      side: '',
      color: '',
      locationIdentifier: ''
    };
  }
}
