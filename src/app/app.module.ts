import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialsComponent } from './materials/materials.component';
import { PartManagerComponent } from './part-manager/part-manager.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { AddMaterialComponent } from './materials/add-material/add-material.component';
import { RecentMaterialsComponent } from './materials/recent-materials/recent-materials.component';
import { AddPartComponent } from './part-manager/add-part/add-part.component';
import { RecentPartsComponent } from './part-manager/recent-parts/recent-parts.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'materials', component: MaterialsComponent, canActivate:[AuthGuard] },
  { path: 'part-manager', component: PartManagerComponent, canActivate:[AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MaterialsComponent,
    PartManagerComponent,
    MenuComponent,
    HeaderComponent,
    AddMaterialComponent,
    RecentMaterialsComponent,
    AddPartComponent,
    RecentPartsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
