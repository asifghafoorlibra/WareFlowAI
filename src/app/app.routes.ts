import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { InventoryComponent } from './pages/inventory.component/inventory.component';
 
import { Component } from '@angular/core';
 
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'about', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      {path: 'inventory', component: InventoryComponent}
    ]
  }
];

