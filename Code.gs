// ========================================
// BACKEND - Google Apps Script
// ========================================

// Función para manejar solicitudes POST
function doPost(e) {
  try {
    // Leer los datos directamente de los parámetros del formulario
    var partido = e.parameter.partido;
    var timestamp = e.parameter.timestamp;
    
    // Obtener la hoja de cálculo activa
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // Si la hoja está vacía, agregar encabezados
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Fecha', 'Hora', 'Partido']);
    }
    
    // Usar la fecha/hora del servidor para mayor fiabilidad
    var ahora = new Date();
    var fecha = Utilities.formatDate(ahora, Session.getScriptTimeZone(), 'dd/MM/yyyy');
    var hora = Utilities.formatDate(ahora, Session.getScriptTimeZone(), 'HH:mm:ss');
    
    // Agregar nueva fila con los datos
    sheet.appendRow([fecha, hora, partido]);
    
    // Devolver respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Voto registrado correctamente'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Manejo de errores
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función para manejar solicitudes GET (opcional, para pruebas)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Sistema de votación activo'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
