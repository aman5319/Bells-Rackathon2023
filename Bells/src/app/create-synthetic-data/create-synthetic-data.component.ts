import { Component } from '@angular/core';

@Component({
  selector: 'app-create-synthetic-data',
  templateUrl: './create-synthetic-data.component.html',
  styleUrls: ['./create-synthetic-data.component.scss']
})
export class CreateSyntheticDataComponent {
  task: any = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Transaction1', completed: false, color: 'primary' },
      { name: 'Transaction2', completed: false, color: 'accent' },
      { name: 'Transaction3', completed: false, color: 'warn' },
    ],
  };

  // transactions: Transactions[] = [

  //   new Transactions(1, 'Credit Card/ Debit Card Transactions',
  //     [ new TransactionType ('Fraud 1', 1, false), 
  //     new TransactionType ('Fraud 2', 2, false), 
  //     new TransactionType ('Fraud 3', 3, false)], false),

  //     new Transactions(2, 'Transactions',
  //     [ new TransactionType ('Fraud 1', 4, false), 
  //     new TransactionType ('Fraud 2', 5, false), 
  //     new TransactionType ('Fraud 3', 6, false)], false),

  //     new Transactions(3, 'Credit Card',
  //     [ new TransactionType ('Fraud 1', 7, false), 
  //     new TransactionType ('Fraud 2', 8, false), 
  //     new TransactionType ('Fraud 3', 9, false)], false),

  //     new Transactions(4, ' Card/  Card ',
  //     [ new TransactionType ('Fraud 1', 10, false), 
  //     new TransactionType ('Fraud 2', 11, false), 
  //     new TransactionType ('Fraud 3', 12, false)], false),

  // ];


  transactions: TransactionType[] =
    [
      new TransactionType('Sudden Deduction of huge amount', 1, false, 'big_amount_deduction'),
      new TransactionType('High Volume Small Deductions', 2, false, 'high_volume_small_deduction'),
      new TransactionType('Fake Merchants/Geo-Location Hopping/ Phishing website', 3, false, 'fake_merchant_false_location'),
      new TransactionType('Multiple Retries before succes/Transactions in High-Risk Category (Casino, Child Ponography) ', 4, false, 'multiple_retry'),
      new TransactionType('Money Laundering', 5, false, 'money_laundering')
    ];

  allComplete: boolean = false;

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t: { completed: boolean; }) => (t.completed = completed));
  }
}

export class Transactions {
  name: string;
  transactions: TransactionType[] = [];
  isChecked: boolean = false;
  id: number;

  constructor(id: number, name: string, transactions: TransactionType[], isChecked = false) {
    this.id = id;
    this.name = name;
    this.transactions = transactions;
    isChecked = isChecked
  }
}


export class TransactionType {
  name: string;
  id: number;
  isChecked: boolean = false;

  constructor(name: string, id: number, isChecked = false, fileName: string) {
    this.name = name;
    this.id = id;
    isChecked = isChecked
    fileName = fileName
  }
}

