import {Component, inject} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BehaviorSubject, combineLatest, map} from "rxjs";
import {CommonModule} from "@angular/common";
import {ChildProductComponent} from "../child-product/child-product.component";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-parent-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ChildProductComponent],
  templateUrl: './parent-product.component.html',
  styleUrl: './parent-product.component.scss'
})
export class ParentProductComponent {
  http = inject(HttpClient);
  searchString = new BehaviorSubject('');
  products$ = combineLatest(this.http.get('https://fakestoreapi.com/products'), this.searchString).pipe(
    map(([products, searchString]) => (products as Product[])
      .map((product: Product) => ({ title: product.title, price: product.price, image: product.image}))
      .filter(((product: Product) => product.title.includes(this.searchString.value)))
    )
  );
  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchString.next(inputValue);
  }
  onProductBuy(product: Product) {
    console.log('Product buy - ', product);
  }
}
