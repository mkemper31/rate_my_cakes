import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  cakes = [];
  cakeInfo: string;
  newCake: any;
  isEditing = false;
  editingCake: any;
  newComment: any;
  selectedCake: any;
  averageRating: number;
  constructor(private _httpService: HttpService) {
    this.getCakesFromService();
  }
  ngOnInit() {
    this.newCake = { baker: '', imgurl: '', comments: [ { text: '', rating: 5 } ] };
    this.newComment = { text: '', rating: 5 };
  }
  getCakesFromService() {
    console.log('hello');
    const observable = this._httpService.getCakes();
    observable.subscribe(data => {
      console.log('Cakes:', data);
      this.cakes = data['cakes'];
    });
  }
  buttonClickLog(event): void {
    console.log('Button is clicked.', event);
  }
  createCake() {
    const observable = this._httpService.createCake(this.newCake);
    observable.subscribe(data => {
      this.getCakesFromService();
      console.log('new cake:', data);
    });
    this.newCake = { baker: '', imgurl: '', comments: [ { text: '', rating: 5 } ] };
  }
  onClickEdit(id) {
    console.log(id);
    const observable = this._httpService.getCake(id);
    observable.subscribe(data => {
      this.editingCake = data['cake'];
      this.isEditing = true;
    });
  }
  onClickDelete(id) {
    const observable = this._httpService.deleteCake(id);
    observable.subscribe(data => {
      this.getCakesFromService();
      console.log(data);
    });
  }
  updateCake(cake) {
    cake.comments.push(cake.comments[0]);
    cake.comments[0] = { text: '', rating: 5};
    console.log('edited cake:', cake);
    const observable = this._httpService.updateCake(cake);
    observable.subscribe(data => {
      this.getCakesFromService();
    });
    this.isEditing = false;
    this.editingCake = { title: '', description: '' };
  }
  displayCake(cake) {
    this.selectedCake = cake;
    let sum = 0;
    for (let i = 1; i < cake.comments.length; i++) {
      sum += cake.comments[i].rating;
    }
    try {
      this.averageRating = sum / (cake.comments.length - 1);
    } catch {
      this.averageRating = 0;
    }
  }
}
