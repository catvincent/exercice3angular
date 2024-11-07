import { Injectable, inject } from '@angular/core';
import { Transaction } from './transaction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  //transactionList: Transaction[] = [];
  baseUrl = 'http://localhost:3000/';
  /*
  http://localhost:3000/transactions
  http://localhost:3000/id
http://localhost:3000/amount
http://localhost:3000/balance
http://localhost:3000/label
http://localhost:3000/description
http://localhost:3000/date
*/

  // pour les services, qui ne sont pas instanciés de la même façon que les components, 
  // il faut déclarer et initialiser les propriétés dans la même expression :
  transactionList: Transaction[] = [];

    transaction0100: Transaction = {
      "id": "01-00",
	    "amount": 157.21,
	    "balance": 2657.21,
	    "label": "Intérêts",
	    "description": "Intérêts 2014",
	    "date": "2015-01-01T00:00+01:00"
    };

    transaction0101: Transaction = {
      "id": "01-01",
      "amount": -152.36,
      "balance": 2504.85,
      "label": "Courses",
      "description": "Courses alimentaires chez Casino",
      "date": "2015-01-01T15:32+01:00"
    };

    private httpClient = inject(HttpClient);
  //  constructor() { }
  // This service can now make HTTP requests via `this.http`.
  //constructor(private httpClient: HttpClient) {}

 /* async getTransactionById(id: string): Promise<Transaction | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
    //return this.transactionList.find((transaction) => transaction.id === id );
  }*/

  /*async getAllTransactions(): Promise<Transaction[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
    //return this.transactionList;
  }

Observable est l'objet de base de la programmation réactive. 
La méthode subscribe permet de créer des observateurs.
Sans subcribe l'observable n'est pas observé.
subscribe prend en paramètre l'observateur : simple fonction qui 
recevra les valeurs émises par l'observable.

ex :

 
  getTransactions(): Observable<Transition[]> {
    return this.httpClient.get(...).pipe(map((res: Transition[]) => res)
    ));
  }
  dans le component :
   ngOnInit() {
    this.monService.getArticles().subscribe(
     articles => this.articles = articles
    );
  }
*/

  setTransactionList(){ 
    this.getTransactions().subscribe((res: Transaction[])=> {
        this.transactionList = res;
    });
  }

  //Les différentes méthodes du service http retournent des Observable<any>
  getTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(this.baseUrl+'transactions');
  }

  getTransactionById() {
    this.setTransactionList();
    console.log("=======test======"+this.transactionList[8].amount);
  }
  
  getTransaction0100(): Transaction {
    return this.transaction0100;
  }

  getTransaction0101(): Transaction {
    return this.transaction0101;
  }
 
}
