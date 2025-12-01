import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Response from '../models/Response';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchTerm: string = '';
  searchHistory: string[] = [];
  showHistory: boolean = false;
  searchResponse?: Response;
  isLoading: boolean = false;

  constructor(private elementRef: ElementRef, private http:HttpClient) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showHistory = false;
    }
  }

  onSearchFocus(): void {
    this.showHistory = true;
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      // Remove duplicate if exists and add to beginning
      this.searchHistory = this.searchHistory.filter(
        item => item !== this.searchTerm.trim()
      );
      this.searchHistory.unshift(this.searchTerm.trim());
      
      // Simulate API call - Replace with your actual API call
      this.isLoading = true;
      // this.simulateApiCall(this.searchTerm.trim());
      const headers = {
        'Content-Type': 'application/json'
      };
      this.http.post<Response>('https://localhost:7193/api/query',{question : this.searchTerm}, {headers})
      .subscribe({
        next:(res)=>{
          this.isLoading = false;
          this.searchResponse = res;
          console.log(this.searchResponse);
        },
        error:(err)=>{
          console.log(err);
        }
      });
      
      this.showHistory = false;
    }
  }

  // Replace this with your actual API service call
  // simulateApiCall(query: string): void {
  //   setTimeout(() => {
  //     this.searchResponse = {
  //       question: query,
  //       sqlcommand: `SELECT * FROM users WHERE name LIKE '%${query}%' ORDER BY created_at DESC LIMIT 10;`,
  //       result: [
  //         { id: 1, name: query, email: 'user1@example.com', status: 'active' },
  //         { id: 2, name: `${query} 2`, email: 'user2@example.com', status: 'inactive' },
  //         { id: 3, name: `${query} 3`, email: 'user3@example.com', status: 'active' }
  //       ],
  //       executionTime: '0.045s'
  //     };
  //     this.isLoading = false;
  //   }, 800);
  // }

  onHistoryClick(term: string): void {
    this.searchTerm = term;
    this.showHistory = false;
    this.onSearch();
  }

  clearHistory(): void {
    this.searchHistory = [];
  }

  removeHistoryItem(item: string, event: Event): void {
    event.stopPropagation();
    this.searchHistory = this.searchHistory.filter(
      historyItem => historyItem !== item
    );
  }

  get recentSearches(): string[] {
    return this.searchHistory.slice(0, 3);
  }

  getResultKeys(): string[] {
    if (this.searchResponse && this.searchResponse.result?.length > 0) {
      return Object.keys(this.searchResponse.result[0]);
    }
    return [];
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
  }
  // searchTerm: string = '';
  // searchHistory: string[] = [];
  // showHistory: boolean = false;
  // response?:Response;
  // isLoading: boolean = false;

  // constructor(private elementRef: ElementRef, private http:HttpClient) {}

  // // Handle clicks outside the component
  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent): void {
  //   if (!this.elementRef.nativeElement.contains(event.target)) {
  //     this.showHistory = false;
  //   }
  // }

  // onSearchFocus(): void {
  //   this.showHistory = true;
  // }

  // onSearch(): void {
  //   if (this.searchTerm.trim()) {
  //     // Remove duplicate if exists and add to beginning
  //     this.searchHistory = this.searchHistory.filter(
  //       item => item !== this.searchTerm.trim()
  //     );
  //     this.searchHistory.unshift(this.searchTerm.trim());
      
  //     // Perform your search logic here
  //     console.log('Searching for:', this.searchTerm);
  //     const headers = {
  //       'Content-Type': 'application/json'
  //     };
  //     this.isLoading = true;
  //     this.http.post<Response>('https://localhost:7193/api/query',{question : this.searchTerm}, {headers})
  //     .subscribe({
  //       next:(res)=>{
  //         this.isLoading = false;
  //         this.response = res;
  //         console.log(this.response);
  //       },
  //       error:(err)=>{
  //         console.log(err);
  //       }
  //     });
      
  //     this.searchTerm = '';
  //     this.showHistory = false;

  //   }
  // }

  // onHistoryClick(term: string): void {
  //   this.searchTerm = term;
  //   this.showHistory = false;
  // }

  // clearHistory(): void {
  //   this.searchHistory = [];
  // }

  // removeHistoryItem(item: string, event: Event): void {
  //   event.stopPropagation();
  //   this.searchHistory = this.searchHistory.filter(
  //     historyItem => historyItem !== item
  //   );
  // }

  // get recentSearches(): string[] {
  //   return this.searchHistory.slice(0, 3);
  // }
}
