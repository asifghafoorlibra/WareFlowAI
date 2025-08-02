import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
  selector: 'admin-layout',
  imports: [HeaderComponent, RouterOutlet, SidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements AfterViewInit{
 ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/plugins/apexchart/chart-data.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
