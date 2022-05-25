
import { DigimonService } from '../service/digimon.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DigimonModel } from '../model/digimon.modal';
import { AlmacenPdfModule } from 'src/utils/generador.pdf';

@Component({
  selector: 'app-digimon',
  templateUrl: './digimon.component.html',
  styleUrls: ['./digimon.component.css']
})

export class DigimonComponent implements OnInit{

	digimones: any[];
	displayedColumns: string[] = ['nombre', 'imagen', 'nivel'];
	dataSource = new MatTableDataSource<DigimonModel>();
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	
	constructor(private digimonService: DigimonService) { }

	// ngAfterViewInit() {
	// 	this.dataSource.paginator = this.paginator;
	//   }
	
	ngOnInit() {
		this.list();		
	}

	list(){

		 var info = this.digimonService.getDigimones().subscribe(
			(r) => { this.digimones = r; }
		)
		
	}

	// search(filter:string){
	// 	this.dataSource.filter = filter;
	// }

	async abrirpdf() {
  		(await AlmacenPdfModule.Pokemon.create(this.digimones)).download(`Reporte-Pokemon.pdf`);
	}
	
}



 

