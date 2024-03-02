import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent, // Add HomeComponent to imports
        // Remove HomeComponent from declarations
        // Include other components here if needed
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule, // Use AppRoutingModule instead of RouterModule here
        
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
