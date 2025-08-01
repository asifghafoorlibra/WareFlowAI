import { Component, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-contact.component',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit {
ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/plugins/apexchart/chart-data.js';
    script.async = true;
    document.body.appendChild(script);
  }

}
