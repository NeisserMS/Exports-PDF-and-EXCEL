import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { HttpClientModule } from '@angular/common/http';

import { DigimonService } from './service/digimon.service';

import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { DigimonComponent } from './digimon/digimon.component';
import { SearchPipe } from './search.pipe';


PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
	declarations: [
		AppComponent,
		DigimonComponent,
		SearchPipe
	],

	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule
	],

	providers: [
		DigimonService
	],

	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
