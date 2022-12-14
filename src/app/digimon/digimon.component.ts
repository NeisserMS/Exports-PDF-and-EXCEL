
import { DigimonService } from '../service/digimon.service';
import { Component, OnInit } from '@angular/core';
import { DigimonModel } from '../model/digimon.modal';
import { PdfDigimonModule } from 'src/utils/generador.pdf';
import { ExcelDigimonModule } from 'src/utils/excel.util';
import { LOGO } from 'src/assets/logo';

@Component({
	selector: 'app-digimon',
	templateUrl: './digimon.component.html',
	styleUrls: ['./digimon.component.css']
})

export class DigimonComponent implements OnInit {

	digimones: any[];
	filterPost = '';
	logito = LOGO;

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
		(await PdfDigimonModule.Digimon.create(this.digimones)).download(`Reporte_Digimon.pdf`);
	}

	async abrirExcel() {
		await ExcelDigimonModule.Digimon.create(this.digimones);
	}
}





