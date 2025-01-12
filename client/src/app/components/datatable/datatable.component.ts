import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BaseIconComponent } from '../base-icon/base-icon.component';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, BaseIconComponent],
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

  @Output()
  public onEditClick = new EventEmitter<void>();

  @Output()
  public onDeleteClick = new EventEmitter<number>();

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource<T>(this.data);
  }

  public ngAfterViewInit(): void {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  public HandleEditIconClick(): void {
    this.onEditClick.emit();
  }

  public HandleDeleteIconClick(id: number): void {
    this.onDeleteClick.emit(id);
  }
}
