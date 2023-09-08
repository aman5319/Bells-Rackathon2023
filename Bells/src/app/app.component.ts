import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSyntheticDataComponent, TransactionType } from './create-synthetic-data/create-synthetic-data.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './app.service';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Bells';


  displayedColumns: string[] = ['name', 'progress', 'actions'];
  dataSource: TransactionData[] = [];

  constructor(public dialog: MatDialog, public _snackBar: MatSnackBar, public appService: AppService, public localStorage: LocalStorageService) {

  }

  ngOnInit() {
    this.localStorage.clear();
    let value = this.GetData(1, [1, 2]);
    value.files = ['assets/localData/' + value.name + '/big_amount_deduction.csv'];
    this.dataSource = this.pushData(value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateSyntheticDataComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.localStorage.getFilesData(this.title, 0).forEach((element: string) => {
        this.appService.getFile(element);
      });
     
      let data = result.filter((x: TransactionType) => x.isChecked);
      if (data.length > 0) {
        let trans_ids = data.map((x: TransactionType) => x.id);
        let count = this.localStorage.getCount(this.title) + 1;
        let value = this.GetData(count, trans_ids);
        this.dataSource = this.pushData(value);
        this.CallAPI(value, count);
      }
      else {

      }
    });
  }

  private CallAPI(value: { isTraining: boolean; isCompleted: boolean; isCancelled: boolean; name: string; id: number; transactionStrategies: any; }, count: number) {
    this.appService.postData(value.transactionStrategies, value.name).subscribe((result: any) => {
      this.localStorage.getSpecificIndexDataAndSetDataBack(this.title, count, false, true, false, result);
      this._snackBar.open("Data is ready to download", "Close");
    }, () => {
      this._snackBar.open("An error occured while trying to fetch the API", "Close");
    });
  }

  public GetData(count: number, trans_ids: number[]): TransactionData {
    return {
      isTraining: true,
      isCompleted: false,
      isCancelled: false,
      name: 'Batch' + count,
      id: count,
      transactionStrategies: trans_ids,
      files: []
    };
  }

  getRecord(row: any) {
    console.log(row);
  }

  RetrainModel(row: any) {
    const dialogRef = this.dialog.open(CreateSyntheticDataComponent, {
      width: '40%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this._snackBar.open("Retarining started", "Close");
      row.isTraining = true;
      row.isCancelled = false;
    });
  }

  CancelTraining(row: any) {
    console.log(row);
    this._snackBar.open("Cancelled Training", "Close");
    let rowData = this.dataSource.find(x => x.name == row.name);
    row.isTraining = false;
    row.isCancelled = true;

  }

  pushData(value: TransactionData) {
    this.localStorage.setItem(this.title, value);
    return this.localStorage.getItem(this.title);
  }
}


export interface TransactionData {
  isTraining: boolean;
  isCompleted: boolean;
  isCancelled: boolean;
  name: string;
  id: number;
  transactionStrategies: number[] | undefined;
  files: string[] | undefined;
}

