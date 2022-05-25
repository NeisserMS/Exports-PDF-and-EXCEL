import { PDFUtil } from "./pdf.utils";
import { Canvas, Cell, Columns, Img, Line, Stack, Table, Txt } from "pdfmake-wrapper";
import { IContentDefinition, ICreatePDF } from "pdfmake-wrapper/lib/interfaces";
import { createInjectableType } from "@angular/compiler";

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

export class Humedad extends PDFUtil{
    static async create(): Promise<ICreatePDF> {

        let pdf = this.getInstance();


        return pdf.create();
    }


 }

}