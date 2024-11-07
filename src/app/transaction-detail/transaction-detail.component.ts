import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../transaction';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.css'
})
export class TransactionDetailComponent implements OnInit {

  // injection du service et récupération des données
  transactionService: TransactionService = inject(TransactionService);
  route: ActivatedRoute = inject(ActivatedRoute);
  transactionId = '';
  // !: pour permettre de ne pas avoir à initialiser la variable
  // on sait qu'elle va être forcément transmise 
  transaction!: Transaction;

  // récupération de la liste des transactions : méthode 1 mode async
  // l'Observable transactions$ guette la réponse de la fonction appelée
  // celle-ci sera alors affichée dans la template à l'aide du pipe async.
  transactions$ = this.transactionService.getTransactions();
  transactionList: Transaction[] = [];

  fetchTransitionDetail() {
   // (this.transactions$ | async) ;
  }

  // Les paramètres de route sont des observables. 
  // Nous les observons pour en obtenir les valeurs et mettre à jour 
  // le componenent automatiquement suite à leurs modifications.
  ngOnInit() {

   

   /// this.transactionService.setTransactionList();
    this.route.params.subscribe(params => {
      this.transactionId = params['id'];
      
       // TODO : appel au service Transaction pour récupérer la fiche détail de l'id
       if(this.transactionId === '01-00') {
         this.transaction = this.transactionService.getTransaction0100();
       }
       if(this.transactionId === '01-01') {
        this.transaction = this.transactionService.getTransaction0101();
       }
      // console.log("=======test======"+this.transactionService.getTransactionById());
    });


   /* this.transactionService.getItems('https://jsonplaceholder.typicode.com/users')
    .subscribe(
      items => {
        this.items = items;
        this.loaded = true;
      });*/
  }

  /*

    hero$: Observable<Hero>;
constructor(
  private route: ActivatedRoute,
  private router: Router  ) {}
ngOnInit() {
  const heroId = this.route.snapshot.paramMap.get('id');
  this.hero$ = this.service.getHero(heroId);
}
gotoItems(hero: Hero) {
  const heroId = hero ? hero.id : null;
  // Pass along the hero id if available
  // so that the HeroList component can select that item.
  this.router.navigate(['/heroes', { id: heroId }]);
}
  }*/

}
