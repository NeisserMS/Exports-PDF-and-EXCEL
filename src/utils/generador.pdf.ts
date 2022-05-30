import { PDFUtil } from "./pdf.utils";
import { Canvas, Cell, Columns, Img, Line, Stack, Table, Txt } from "pdfmake-wrapper";
import { ICreatePDF } from "pdfmake-wrapper/lib/interfaces";
import { DigimonModel } from "src/app/model/digimon.modal";



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
                    [
                        new Cell(new Txt(`TOTAL DE POKÉMONS: ${data.length}`).style("cellbold").alignment("left").end).colSpan(3).end, {}, {},
                    ]
                ],

            ).widths(["*", "*", "*"]).end;

            let footer = new Stack([
                new Txt("Espero sea de ayuda - Atte. Neisser Moreno").style("cell").alignment("right").margin([0, 10, 0, 10]).end
            ]).end;

            pdf.add(tabla);
            pdf.add(footer);

            return pdf.create();
        }
    }

}