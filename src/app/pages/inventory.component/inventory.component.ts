import { Component, AfterViewInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ForecastData } from '../../models/forecast_model';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements AfterViewInit {
  forecastData: ForecastData[] = [];
  private isTableInitialized = false;
  private apiUrl = 'http://localhost:5000/api/forecast/run';

  constructor(private ngZone: NgZone, private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.fetchForecastData(); // Initial load
  }

  public fetchForecastData(): void {
    const payload = {
      sku: '0B95E4',
      forecast_days: 30,
      noise_level: 0.05
    };

    this.http.post<{ forecast_data: ForecastData[] }>(this.apiUrl, payload)
      .subscribe(response => {
        this.forecastData = response.forecast_data;
        this.reinitializeDataTable();
      });
  }
private reinitializeDataTable(): void {
  this.ngZone.runOutsideAngular(() => {
    // Wait for Angular to render the new rows
    setTimeout(() => {
      const table = $('#inventoryTable');
      const searchInput = $('#customSearch');

      // Destroy previous instance if exists
      if ($.fn.DataTable.isDataTable('#inventoryTable')) {
        table.DataTable().clear().destroy();
      }

      // Wait again to ensure DOM is fully stable
      setTimeout(() => {
        const dataTable = table.DataTable({
          responsive: true,
          dom: 'lrtip',
          columnDefs: [{ targets: 'no-sort', orderable: false }],
          drawCallback: () => {
            console.log('✅ Table draw complete');
          }
        });

        searchInput.off('keyup').on('keyup', function (event: any) {
          const value = event.target.value;
          dataTable.search(value).draw();
        });

        console.log('✅ DataTable safely reinitialized');
      }, 100); // Slight delay to ensure DOM is ready
    }, 0);
  });
}
}