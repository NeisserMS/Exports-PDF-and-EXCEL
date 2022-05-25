import { PDFUtil } from "./pdf.utils";
import { Canvas, Cell, Columns, Img, Line, Stack, Table, Txt } from "pdfmake-wrapper";
import { IContentDefinition, ICreatePDF } from "pdfmake-wrapper/lib/interfaces";
import { createInjectableType } from "@angular/compiler";
import { DigimonModel } from "src/app/model/digimon.modal";

type InfoType = { title: string, value: string };
type NaveType = { campo1: string, campo2: string, campo3: string, campo4: string, campo5: string, campo6: string, campo7: string, campo8: string };
type RemuneracionType = { concepto: string, horaDia: string, importe: string };
type AportacionType = { concepto: string, importe: string };

// interface DataResponse {
//     id: number;
//     userId: number;
//     title_: string;
//     completed:boolean;
// }

// type TableRow = [number, number, string, boolean];
export module AlmacenPdfModule {

    export class Pokemon extends PDFUtil {
        static async create(data: DigimonModel[]): Promise<ICreatePDF> {

            let pdf = this.getInstance();
            let content: any[] = [];

            let titulo = new Stack([
                new Txt("LISTA DE POKÉMONES").style("title").margin([0, 10, 0, 10]).end
            ]).end;

            for (let item of data) {
                content.push(
                    [
                        new Txt(item.name).style("cell").end,
                        new Txt(item.img).style("cell").end,
                        new Txt(item.level).style("cell").end,
                    ]
                );
            }

            pdf.add(titulo);

            let tabla = new Table(
                [
                    [
                        new Txt("NOMBRE").style("cellbold").end,
                        new Txt("URL FOTO").style("cellbold").end,
                        new Txt("ESTADO").style("cellbold").end,
                    ],

                    ...content,
                ],

            ).widths(["*", "*", "*"]).end;

            pdf.add(tabla);



            return pdf.create();
        }
    }

}