import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Part } from 'src/app/models/part';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recent-parts',
  templateUrl: './recent-parts.component.html'
})
export class RecentPartsComponent {
  parts: Part[] = [];
  isLoading = false;
  private updateSubscription: Subscription | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.fetchParts();

    // 🔄 Automatically refresh when parts are updated
    this.updateSubscription=this.firebaseService.partsUpdated$.subscribe(() => {
      this.fetchParts();
    });
  }

  private fetchParts() {
  this.isLoading = true;
    this.firebaseService.getParts().subscribe(
      (response: { [key: string]: Part }) => {
        const partsArray: Part[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const part = response[key];
            part.id = key;
            partsArray.push(part);
          }
        }
        this.parts = partsArray.reverse();
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching parts:', error);
        this.isLoading = false;
      }
    );
  }

  deletePart(id: string) {
    if (confirm('Are you sure you want to delete this part?')) {
      this.firebaseService.deletePart(id).subscribe();
    }
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }


}