import { Workbook, Worksheet } from 'exceljs';
import { DigimonModel } from 'src/app/model/digimon.modal';
import { logo } from './logo_base64';

export module ExcelDigimonModule {
    export class Digimon {
        static async create(data: DigimonModel[]) {

            const workbook = new Workbook();
            const title = 'DigimonesExcel';
            let fecha = new Date();
            const image = logo;

            let worksheet: Worksheet;
            worksheet = workbook.addWorksheet('Hoja 1');

            const Headers = ['NOMBRE', 'URL FOTO', 'ESTADO'];

            const columnIndexStart = 1;
            const rowIndexStart = 1;

            let currentColumnIndex = columnIndexStart;
            let currentRowIndex = rowIndexStart + 1;

            worksheet.getColumn(1).width = 30
            worksheet.getColumn(2).width = 30
            worksheet.getColumn(3).width = 30
            worksheet.getColumn(4).width = 30

            worksheet.getRow(1).height = 50;

            const logoId = workbook.addImage({ base64: `data:image/png;base64,${image}`, extension: 'png' });
            worksheet.addImage(logoId, 'A1:B1');

            worksheet.getCell('C1').value = {
                richText: [
                    { font: { italic: false }, text: 'LISTA DE DIGIMONES' },
                ]
            };

            worksheet.getCell('C1').alignment = {
                horizontal: 'center',
                vertical: 'middle'
            };

            worksheet.getCell('C1').font = {
                name: 'Yu Gothic',
                color: { argb: '2838D3' },
                bold: true,
                size: 14,
            };

            worksheet.getCell('D1').value = {
                richText: [
                    { font: { italic: false }, text: `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}` },
                ]
            };

            worksheet.getCell('D1').alignment = {
                horizontal: 'center',
                vertical: 'middle'
            };

            worksheet.getCell('D1').font = {
                name: 'Yu Gothic',
                color: { argb: '000000' },
                bold: true,
                size: 12,
            };

            worksheet.getRow(currentRowIndex).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };

            data.forEach((x) => {
                let xrow = worksheet.addRow([x.name, x.img, x.level]);
                xrow.alignment = { horizontal: 'center', vertical: 'middle' };
                xrow.font = { bold: false, size: 9, name: 'Yu Gothic', color: { argb: '414456' } };
            });

            worksheet.getRow(currentRowIndex).values = [...Headers];

            await workbook.xlsx.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const anchor = document.createElement('a');
                const url = URL.createObjectURL(blob);
                anchor.href = url;
                anchor.download = title + '.xlsx';
                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
                URL.revokeObjectURL(url);
            }).catch(err => console.log(err));
        }
    }




}
