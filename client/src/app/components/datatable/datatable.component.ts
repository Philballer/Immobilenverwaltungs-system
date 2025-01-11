import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
})
export class DatatableComponent<T> implements OnInit, AfterViewInit {
  @Input()
  public data: T[] = [];

  @Input()
  public displayedColumns?: string[] = [];

  public dataSource: any;

  @ViewChild(MatPaginator)
  public paginator: MatPaginator | undefined;

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource<T>(this.data);
  }

  public ngAfterViewInit(): void {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }
}
