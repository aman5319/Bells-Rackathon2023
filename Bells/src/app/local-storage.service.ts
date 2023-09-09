import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from './app.module';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: Storage) { }

  setItem(key: string, value: any): void {
    // Retrieve the current array or create a new one if it doesn't exist
    const currentJsonMyArray = localStorage.getItem(key);
    const currentArray = currentJsonMyArray ? JSON.parse(currentJsonMyArray) : [];

    // Modify the array
    currentArray.push(value); // Add a new element

    // Convert it back to a JSON string
    const updatedJsonMyArray = JSON.stringify(currentArray);

    // Store the updated JSON string in localStorage
    localStorage.setItem(key, updatedJsonMyArray);

  }

  getItem(key: string): any {
    const value = this.localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  }

  removeItem(key: string): void {
    this.localStorage.removeItem(key);
  }

  clear(): void {
    this.localStorage.clear();
  }

  getCount(key: string): number {
    // Retrieve the array from localStorage
    const storedJsonMyArray = localStorage.getItem(key);
    const retrievedArray = storedJsonMyArray ? JSON.parse(storedJsonMyArray) : [];

    // Get the count of elements in the array
    const count = retrievedArray.length;
return count;
  }

  getSpecificIndexDataAndSetDataBack(key: string, index: number, isCancelled: boolean, isCompleted: boolean, isTraining: boolean, files: string[]) {
    // Retrieve the array from localStorage
    const storedJsonMyArray = localStorage.getItem(key);
    const retrievedArray = storedJsonMyArray ? JSON.parse(storedJsonMyArray) : [];

    // Get a specific item by index (for example, index 2)
    const specificItem = retrievedArray[index];
    specificItem.isCancelled = isCancelled;
    specificItem.isCompleted = isCompleted;
    specificItem.isTraining = isTraining;
    specificItem.files = files;
    localStorage.setItem(key, JSON.stringify(retrievedArray));
    return retrievedArray;
  }

  getFilesData(key: string, index: number) {
    const storedJsonMyArray = localStorage.getItem(key);
    const retrievedArray = storedJsonMyArray ? JSON.parse(storedJsonMyArray) : [];

    // Get a specific item by index (for example, index 2)
    const specificItem = retrievedArray[index];
    return specificItem.files;
  }
}
