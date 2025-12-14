import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  products: Product[] = [];
  form = { name: '', description: '', price: 0};
  editId: number | null = null;
  darkMode = false;

  ngOnInit(): void {
    this.load();
  }

  load() {
    const data = localStorage.getItem('products');
    this.products = data ? JSON.parse(data) : [
      {id: 1, name: 'Sample Laptop', description: 'Fast', price: 100},
      {id: 2, name: 'Sample Phone', description: 'New', price: 500}
    ];
  }

  saveToStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  save() {
    if(!this.form.name || this.form.price <=0) return;
    
    if(this.editId) {
      const p = this.products.find(x => x.id === this.editId)!;
      Object.assign(p, this.form);
    } else {
      this.products.push({...this.form, id: Date.now()});
    }
    this.saveToStorage();
    this.reset();
  }

  edit(p: Product) {
    this.form = { ...p};
    this.editId = p.id;
  }

  cancel() {
    this.reset();
  }

  remove(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    this.saveToStorage();
  }

  reset() {
    this.form = { name: '', description: '', price: 0};
    this.editId = null;
  }
}
