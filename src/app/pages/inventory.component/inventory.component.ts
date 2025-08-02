import { Component, AfterViewInit, NgZone } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements AfterViewInit {
  private isTableInitialized = false;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const interval = setInterval(() => {
        const table = $('#inventoryTable');
        const searchInput = $('#customSearch');

        if (table.length && searchInput.length && !this.isTableInitialized) {
          this.isTableInitialized = true;
          clearInterval(interval);

          // Destroy if already initialized
          if ($.fn.DataTable.isDataTable('#inventoryTable')) {
            $('#inventoryTable').DataTable().destroy();
          }

          const dataTable = $('#inventoryTable').DataTable({
            responsive: true,
            dom: 'lrtip', // Removes default search bar
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ]
          });

          //  Use arrow function to avoid TypeScript scoping error
          searchInput.on('keyup', (event: any) => {
            const value = event.target.value;
            dataTable.search(value).draw();
          });

          console.log('DataTable initialized with custom Bootstrap search');
        }
      }, 100); // Check every 100ms until table and input are ready
    });
  }
}