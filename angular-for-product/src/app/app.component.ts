import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import {Product} from './models/product'
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  productArray: Product[] = []

  constructor(private http:HttpClient){}
  
  ngOnInit(): void {
    this.http.get<Product[]>("http://localhost:8080").subscribe(products => products.forEach(element => {
      this.productArray.push(element)
    }))
  }
  

  selectedProduct: Product = new Product();

  addProduct(id:number){

    if(this.selectedProduct.id === 0) {
      this.http.post<Product>("http://localhost:8080", this.selectedProduct).subscribe(response => this.productArray.push(response))
    }else{
      this.http.put<Product>("http://localhost:8080", this.selectedProduct).subscribe(response => {
        let index=this.productArray.findIndex(elements=> elements.id==id)
        this.productArray.splice(index,1)
        this.productArray.push(response)
        this.productArray.sort((el1,el2)=> {
          if(el1.id > el2.id)
            return 1
          else
            return -1
          })
        })
    }
    this.selectedProduct = new Product();
  }

  openForEdit(product: Product){
    this.selectedProduct = product;
  }

  delete(){
    if(confirm("Are you sure you eant to delet it?")){
      this.http.delete(`http://localhost:8080/${this.selectedProduct.id}`).subscribe()
    }
    
  }
}
