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
      {name: 'Transaction1', completed: false, color: 'primary'},
      {name: 'Transaction2', completed: false, color: 'accent'},
      {name: 'Transaction3', completed: false, color: 'warn'},
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
    new TransactionType ('Fraud 1', 1, false), 
        new TransactionType ('Fraud 2', 2, false), 
        new TransactionType ('Fraud 3', 3, false),
        new TransactionType ('Fraud 1', 4, false), 
        new TransactionType ('Fraud 2', 5, false), 
        new TransactionType ('Fraud 3', 6, false),
  
        new TransactionType ('Fraud 1', 7, false), 
        new TransactionType ('Fraud 2', 8, false), 
        new TransactionType ('Fraud 3', 9, false)
        
        
    ];

  allComplete: boolean = false;

  

  // someComplete(parentId: number): boolean {
  //   var trans = this.transactions.find(x => x.id == parentId);
    
  //   if (trans == null) {
  //     return false;
  //   }

  //   let count = trans.filter((t: TransactionType) => t.isChecked).length;
  //   return count > 0 && !this.allComplete;
  // }

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

  constructor(name: string, id: number, isChecked = false) {
    this.name = name;
    this.id = id;
    isChecked = isChecked
  }
}

