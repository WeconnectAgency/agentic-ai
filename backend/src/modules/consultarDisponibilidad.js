import { GoogleSpreadsheet } from 'google-spreadsheet';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function consultarDisponibilidad(fecha) {
  try {
    let registros = [];

    if (
      process.env.GOOGLE_SHEET_ID &&
      process.env.GOOGLE_CLIENT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY
    ) {
      const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
      await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      });
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows();
      registros = rows.map(r => ({
        fecha: r.fecha || r.Fecha,
        disponible:
          r.disponible === true || r.disponible === 'TRUE' || r.Disponible === 'TRUE' || r.Disponible === true
      }));
    } else {
      const jsonPath = path.join(__dirname, '../data/disponibilidad.json');
      const xlsxPath = path.join(__dirname, '../data/disponibilidad.xlsx');
      if (fs.existsSync(jsonPath)) {
        registros = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      } else if (fs.existsSync(xlsxPath)) {
        const workbook = xlsx.readFile(xlsxPath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        registros = xlsx.utils.sheet_to_json(sheet);
      } else {
        throw new Error('No se encontró archivo de disponibilidad');
      }
    }

    const encontrado = registros.find(r => String(r.fecha) === String(fecha));
    if (encontrado && encontrado.disponible) {
      return { disponible: true, mensaje: 'Fecha disponible' };
    }
    return { disponible: false, mensaje: 'Fecha no disponible' };
  } catch (err) {
    console.error('Error consultando disponibilidad:', err);
    return { disponible: false, mensaje: 'No se pudo consultar disponibilidad' };
  }
}

export default consultarDisponibilidad;
