package com.unpaz.backend.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.unpaz.backend.model.Ticket;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class TicketPdfService {

    public byte[] generarTicketPDF(Ticket ticket) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        
        // Formato A5 horizontal: Estilo entrada moderna de Eventbrite
        Document document = new Document(PageSize.A5, 20, 20, 25, 25);

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Identidad visual de TicketFlow
            java.awt.Color primaryColor = new java.awt.Color(196, 194, 72); // Amarillo TicketFlow
            java.awt.Color darkColor = new java.awt.Color(15, 29, 32);      // Verde oscuro para textos
            java.awt.Color lightGray = new java.awt.Color(255,255,255);  // Fondo recuadro derecho

            Font brandFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, Font.NORMAL, primaryColor);
            Font mainTitleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, Font.NORMAL, darkColor);
            Font sectionTitleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, Font.NORMAL, darkColor);
            Font boldDataFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, Font.NORMAL, darkColor);
            Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL, darkColor);
            Font smallFont = FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL, java.awt.Color.GRAY);

            // ---- ENCABEZADO TICKETFLOW ----
            Paragraph brand = new Paragraph("TICKETFLOW", brandFont);
            brand.setSpacingAfter(5);
            document.add(brand);

            // Título principal del Evento
            String tituloEvento = (ticket.getEvento() != null) ? ticket.getEvento().getTitulo() : "Evento No Especificado";
            Paragraph eventTitle = new Paragraph(tituloEvento.toUpperCase(), mainTitleFont);
            eventTitle.setSpacingAfter(15);
            document.add(eventTitle);

            // Identificador único extraído de tu columna 'ticket_id'
            String ticketCode = "TK-" + String.format("%06d", ticket.getTicketId());
            Paragraph codeParagraph = new Paragraph("Ticket N.º " + ticketCode, boldDataFont);
            codeParagraph.setSpacingAfter(15);
            document.add(codeParagraph);

            document.add(new Paragraph("_____________________________________________________________________________________", smallFont));
            document.add(new Paragraph(" "));

            // ---- CUERPO EN DOS COLUMNAS ----
            PdfPTable mainTable = new PdfPTable(2);
            mainTable.setWidthPercentage(100);
            mainTable.setWidths(new float[]{60, 40}); 

            // --- COLUMNA IZQUIERDA: DETALLES LOGÍSTICOS ---
            PdfPCell leftCell = new PdfPCell();
            leftCell.setBorder(PdfPCell.NO_BORDER);
            
            // Fecha y hora (viene de 'fecha_creacion' en la tabla reserva)
            leftCell.addElement(new Paragraph("Fecha y Hora", sectionTitleFont));
            String fecha = "N/A";
            if (ticket.getReserva() != null && ticket.getReserva().getFechaCreacion() != null) {
                fecha = ticket.getReserva().getFechaCreacion().format(DateTimeFormatter.ofPattern("EEEE, dd 'de' MMMM 'de' yyyy 'a las' HH:mm"));
            }
            Paragraph dateText = new Paragraph(fecha, bodyFont);
            dateText.setSpacingAfter(12);
            leftCell.addElement(dateText);

            // MAPEANDO LA LOCACIÓN REAL (nombre y dirección) DESDE EL REPO
            leftCell.addElement(new Paragraph("Ubicación", sectionTitleFont));
            String infoLocacion = "Locación no especificada";
            
            if (ticket.getEvento() != null && ticket.getEvento().getLocacion() != null) {
                String nombreLocacion = ticket.getEvento().getLocacion().getNombre() != null 
                        ? ticket.getEvento().getLocacion().getNombre() : "";
                String direccionLocacion = ticket.getEvento().getLocacion().getDireccion() != null 
                        ? ticket.getEvento().getLocacion().getDireccion() : "";
                
                if (!nombreLocacion.isEmpty() && !direccionLocacion.isEmpty()) {
                    infoLocacion = nombreLocacion + " (" + direccionLocacion + ")";
                } else if (!nombreLocacion.isEmpty()) {
                    infoLocacion = nombreLocacion;
                } else {
                    infoLocacion = direccionLocacion;
                }
            }
            Paragraph lugarText = new Paragraph(infoLocacion, bodyFont);
            lugarText.setSpacingAfter(12);
            leftCell.addElement(lugarText);

            // Sector/Categoría asignado al ticket
            leftCell.addElement(new Paragraph("Sector / Categoría", sectionTitleFont));
            String nombreSector = (ticket.getReserva() != null && ticket.getReserva().getSector() != null) 
                    ? ticket.getReserva().getSector().getNombre() : "Sin sector asignado";
            Paragraph sectorText = new Paragraph(nombreSector, bodyFont);
            sectorText.setSpacingAfter(12);
            leftCell.addElement(sectorText);

            mainTable.addCell(leftCell);

            // --- COLUMNA DERECHA: COMPRADOR Y PRECIO ---
            PdfPCell rightCell = new PdfPCell();
            rightCell.setBackgroundColor(lightGray);
            rightCell.setPadding(12);
            rightCell.setBorder(PdfPCell.NO_BORDER);

            rightCell.addElement(new Paragraph("Información del pedido", sectionTitleFont));
            rightCell.addElement(new Paragraph(" ", smallFont));
            
            // Nombre del comprador mapeado desde cliente_id
            rightCell.addElement(new Paragraph("Nombre del cliente:", smallFont));
            String nombreCompleto = "Consumidor Final";
            if (ticket.getReserva() != null && ticket.getReserva().getCliente() != null) {
                nombreCompleto = ticket.getReserva().getCliente().getNombre() + " " + ticket.getReserva().getCliente().getApellido();
            }
            rightCell.addElement(new Paragraph(nombreCompleto, boldDataFont));      
            rightCell.addElement(new Paragraph(" ", smallFont));

            // Precio total (mapeado de tu columna 'precio' real)
            rightCell.addElement(new Paragraph("Precio total pagado:", smallFont));
            Paragraph priceText = new Paragraph("$" + String.format("%.2f", ticket.getPrecio()), boldDataFont);
            rightCell.addElement(priceText);

            mainTable.addCell(rightCell);
            mainTable.setSpacingAfter(15);
            document.add(mainTable);

            // ---- PIE DE PÁGINA (CONTROL DE SCANNER) ----
            document.add(new Paragraph("__________________________________________________________________________________", smallFont));
            document.add(new Paragraph(" "));

            String idReserva = (ticket.getReserva() != null) ? String.valueOf(ticket.getReserva().getId()) : "0";
            String validationCode = String.format("%06d", ticket.getTicketId()) + "00" + idReserva;
            Paragraph barcodeSim = new Paragraph(validationCode, FontFactory.getFont(FontFactory.COURIER, 11, Font.NORMAL, darkColor));
            barcodeSim.setAlignment(Element.ALIGN_CENTER);
            document.add(barcodeSim);

            Paragraph infoFooter = new Paragraph("Presentá este comprobante digital o impreso el día del evento. Desarrollado por TicketFlow.", smallFont);
            infoFooter.setAlignment(Element.ALIGN_CENTER);
            infoFooter.setSpacingBefore(5);
            document.add(infoFooter);

            document.close();
        } catch (DocumentException e) {
            throw new RuntimeException("Error al compilar el PDF con la relación Locación", e);
        }

        return out.toByteArray();
    }
}