import { PDFUtil } from "./pdf.utils";
import { Cell, Img, Stack, Table, Txt } from "pdfmake-wrapper";
import { ICreatePDF } from "pdfmake-wrapper/lib/interfaces";
import { DigimonModel } from "src/app/model/digimon.modal";

export module AlmacenPdfModule {
    export class Pokemon extends PDFUtil {
        static async create(data: DigimonModel[]): Promise<ICreatePDF> {

            let pdf = this.getInstance();
            let content: any[] = [];
            
            let fecha = new Date();
      
            let encabezado = new Table(
                [
                    [
                        await new Img("assets/pokemon.png").margin([5, 0, 0, 0]).fit([150, 150]).build(),
                        new Txt("LISTA DE POKÉMONES").style("title").margin([0, 45, 0, 10]).fontSize(13).color("blue").end,
                        new Txt(`${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`).margin([40, 45, 0, 0]).end
                    ],
                ],

            ).widths(["*", "*", "*"]).layout('noBorders').end;

            for (let item of data) {
                content.push(
                    [
                        new Txt(item.name).style("cell").end,
                        // new Txt(item.img).style("cell").end,
                        new Txt(item.level).style("cell").end,
                    ]
                );
            }
            
            pdf.add(encabezado);
      
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