
import { DigimonService } from '../service/digimon.service';
import { Component, OnInit } from '@angular/core';

import { DigimonModel } from '../model/digimon.modal';
import { AlmacenPdfModule } from 'src/utils/generador.pdf';

@Component({
	selector: 'app-digimon',
	templateUrl: './digimon.component.html',
	styleUrls: ['./digimon.component.css']
})

export class DigimonComponent implements OnInit {

	digimones: any[];
	filterPost = '';

	constructor(private digimonService: DigimonService) { }

	ngOnInit() {
		this.list();
	}

	list() {
		this.digimonService.getDigimones().subscribe(
			(r) => { this.digimones = r; }
		)
	}

	async abrirpdf() {
		(await AlmacenPdfModule.Pokemon.create(this.digimones)).download(`Reporte-Pokemon.pdf`);
	}
	
	async abrirExcel() {
		(await AlmacenPdfModule.Pokemon.create(this.digimones)).download(`Reporte-Pokemon.pdf`);
	}
}





