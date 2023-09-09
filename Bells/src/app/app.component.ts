import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSyntheticDataComponent, TransactionType } from './create-synthetic-data/create-synthetic-data.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './app.service';
import { LocalStorageService } from './local-storage.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Bells';
  transactions: TransactionType[] =
  [
    new TransactionType('Sudden Deduction of huge amount', 1, false, 'big_amount_deduction'),
    new TransactionType('High Volume Small Deductions', 2, false, 'high_volume_small_deduction'),
    new TransactionType('Fake Merchants/Geo-Location Hopping/ Phishing website', 3, false, 'fake_merchant_false_location'),
    new TransactionType('Multiple Retries before succes/Transactions in High-Risk Category (Casino, Child Ponography) ', 4, false, 'multiple_retry'),
    new TransactionType('Money Laundering', 5, false, 'money_laundering')
  ];


  displayedColumns: string[] = ['name', 'progress', 'actions'];
  dataSource: TransactionData[] = [];

  constructor(public dialog: MatDialog, public _snackBar: MatSnackBar, public appService: AppService, public localStorage: LocalStorageService) {

  }

  ngOnInit() {
    this.localStorage.clear();
    let value = this.GetCompletedData(1, [1]);
    value.files = ['big_amount_deduction'];
    this.dataSource = this.pushData(value);
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateSyntheticDataComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(result => {
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
      this.dataSource = this.localStorage.getSpecificIndexDataAndSetDataBack(this.title, count - 1, false, true, false, result);
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

  public GetCompletedData(count: number, trans_ids: number[]): TransactionData {
    return {
      isTraining: false,
      isCompleted: true,
      isCancelled: false,
      name: 'Batch' + count,
      id: count,
      transactionStrategies: trans_ids,
      files: ['big_amount_deduction.csv']
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
    this.dataSource = this.localStorage.getSpecificIndexDataAndSetDataBack(this.title, row.id - 1, true, false, false, []);
    this._snackBar.open("Cancelled Training", "Close");
  }


  pushData(value: TransactionData) {
    this.localStorage.setItem(this.title, value);
    return this.localStorage.getItem(this.title);
  }

  analyseData(row: TransactionData) {
    row.transactionStrategies?.forEach(element => {
      let tr = this.transactions.find(x => x.id == element);
      let name = this.getFileName(tr?.id, tr?.fileName, '.html', row.name);
      window.open(name, "_blank");
    });
  }

  getFileName(index: number | undefined, name: string | undefined, extension: string, batchNAme: string) {
    let t1 = this.transactions.find(x => x.id == index);
    return 'assets/localData/' + batchNAme + '/'+ name + extension;
  }

  getOutputFile(batchNAme: string) {
    return 'assets/localData/' + batchNAme + '/output.zip';
  }

  downloadData(row: TransactionData) {
    
      // this.appService.getFile(this.getOutputFile(row.name)).subscribe((r) => {
      //   saveAs(r, "output.zip");
      // });

      this.appService.downloadFile(this.getOutputFile(row.name));
   
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



