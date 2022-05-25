import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { DigimonService } from './service/digimon.service';

import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { DigimonComponent } from './digimon/digimon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [	
	AppComponent,
	DigimonComponent
	],

	imports: [
    BrowserModule,
	HttpClientModule,
	BrowserAnimationsModule,
	MatTableModule,
	
	],

	providers: [
    DigimonService
	],

	bootstrap: [
    AppComponent
	]
})
export class AppModule { }
