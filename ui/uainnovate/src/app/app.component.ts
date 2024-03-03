import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  data: any[] = [];

  ngOnInit() {
    fetch('http://localhost:5038/api/GetData')
      .then(response => response.json())
      .then(data => this.data = data)
      .catch(error => console.error('Error:', error));
  }
}
