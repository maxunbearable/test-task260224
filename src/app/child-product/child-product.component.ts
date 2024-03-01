import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../models/product.model";

@Component({
  selector: 'app-child-product',
  standalone: true,
  imports: [],
  templateUrl: './child-product.component.html',
  styleUrl: './child-product.component.scss'
})
export class ChildProductComponent {
  @Input({required: true}) product!: Product;
  @Output() productBuy = new EventEmitter();
}
