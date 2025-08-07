import { Component, AfterViewInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ClusterRecord } from '../../../models/clusters_model'; 
declare var $: any;

@Component({
  selector: 'app-clusters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.css']
})
export class ClustersComponent implements AfterViewInit {
  clusterData: ClusterRecord[] = [];
  private apiUrl = 'http://localhost:5000/api/clusterdata';

  constructor(private ngZone: NgZone, private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.fetchClusterData();
  }

  public fetchClusterData(): void {
    this.http.get<ClusterRecord[]>(this.apiUrl).subscribe(data => {
      this.clusterData = data;
      this.reinitializeDataTable();
    });
  }

  private reinitializeDataTable(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        const table = $('#clusterTable');
        const searchInput = $('#clusterSearch');

        if ($.fn.DataTable.isDataTable('#clusterTable')) {
          table.DataTable().clear().destroy();
        }

        setTimeout(() => {
          const dataTable = table.DataTable({
            responsive: true,
            dom: 'lrtip',
            columnDefs: [{ targets: 'no-sort', orderable: false }],
            drawCallback: () => {
              console.log('Cluster table draw complete');
            }
          });

          searchInput.off('keyup').on('keyup', function (event: any) {
            const value = event.target.value;
            dataTable.search(value).draw();
          });

          console.log('Cluster DataTable safely reinitialized');
        }, 100);
      }, 0);
    });
  }

  trackBySKU(index: number, item: ClusterRecord): string {
    return item.SKU;
  }
}