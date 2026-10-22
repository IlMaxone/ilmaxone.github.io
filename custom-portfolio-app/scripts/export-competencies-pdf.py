"""Export the complete public competency JSON content to an anonymous PDF."""

from argparse import ArgumentParser
from datetime import date
from html import escape
from pathlib import Path
import json
import math
import re

from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, KeepTogether, NextPageTemplate,
)
from reportlab.platypus.tableofcontents import TableOfContents


APP = Path(__file__).resolve().parents[1]
REPO = APP.parent
NAVY = colors.HexColor('#14263D')
INK = colors.HexColor('#26384B')
MUTED = colors.HexColor('#586C80')
ORANGE = colors.HexColor('#C55B2A')
PALE = colors.HexColor('#F1F5F8')
LINE = colors.HexColor('#D7E1E9')
PAGE_W, PAGE_H = 595.276, 841.89
MARGIN = 48
WIDTH = PAGE_W - MARGIN * 2


def register_fonts():
    import reportlab
    candidates = [
        (Path('C:/Windows/Fonts/segoeui.ttf'), Path('C:/Windows/Fonts/segoeuib.ttf')),
        (Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'), Path('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')),
        (Path(reportlab.__file__).parent / 'fonts/Vera.ttf', Path(reportlab.__file__).parent / 'fonts/VeraBd.ttf'),
    ]
    regular, bold = next(pair for pair in candidates if all(p.exists() for p in pair))
    pdfmetrics.registerFont(TTFont('Body', str(regular)))
    pdfmetrics.registerFont(TTFont('BodyBold', str(bold)))
    pdfmetrics.registerFontFamily('Body', normal='Body', bold='BodyBold', italic='Body', boldItalic='BodyBold')


def load_content():
    folder = APP / 'content/landing/Competenze Lavorative'
    detail_files = APP / 'content/approfondimenti'
    details = {}
    for path in sorted(detail_files.glob('*.json')):
        if path.name.startswith('-') or path.name == 'details-template.json':
            continue
        data = json.loads(path.read_text(encoding='utf-8'))
        if data['path'] in details:
            raise ValueError('Duplicate detail path')
        details[data['path']] = data
    planets = []
    for path in sorted(folder.glob('*.json')):
        if not re.match(r'^\d+-', path.name):
            continue
        planet = json.loads(path.read_text(encoding='utf-8'))
        planets.append((planet, details[planet['detailsPath']]))
    if len(planets) != 6:
        raise ValueError('Expected the six active competency planets')
    return planets


def text_of(paragraph):
    return paragraph if isinstance(paragraph, str) else paragraph['text']


def validate_public_content(planets):
    content = json.dumps(planets, ensure_ascii=False)
    forbidden = [
        r'[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}',
        r'\b(?:\d{1,3}\.){3}\d{1,3}\b',
        r'-----BEGIN[^-]*PRIVATE KEY-----',
        r'(?:€|\$|EUR|USD)\s*\d|\d[\d.,]*\s*(?:€|EUR|USD)',
    ]
    for pattern in forbidden:
        if re.search(pattern, content, re.IGNORECASE):
            raise ValueError('Public content contains a potential sensitive value; review before export')


class CompetencyDocument(BaseDocTemplate):
    def __init__(self, output, edition):
        super().__init__(str(output), pagesize=(PAGE_W, PAGE_H),
                         leftMargin=MARGIN, rightMargin=MARGIN,
                         topMargin=62, bottomMargin=50,
                         title='Atlante completo delle competenze lavorative',
                         author='', subject='Sei pianeti e approfondimenti completi in forma anonima',
                         pageCompression=1)
        self.edition = edition
        frame = Frame(MARGIN, 50, WIDTH, PAGE_H - 112, leftPadding=0,
                      rightPadding=0, topPadding=0, bottomPadding=0)
        self.addPageTemplates([
            PageTemplate(id='Cover', frames=[frame], onPage=self.cover),
            PageTemplate(id='Body', frames=[frame], onPage=self.page_chrome),
        ])

    def cover(self, canvas, doc):
        canvas.saveState()
        canvas.setFillColor(NAVY)
        canvas.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
        cx, cy = PAGE_W - 55, 208
        canvas.setStrokeColor(colors.HexColor('#30485F'))
        canvas.setLineWidth(.7)
        for radius in [67, 108, 152, 197, 242, 287]:
            canvas.circle(cx, cy, radius, stroke=1, fill=0)
        for i, angle in enumerate([155, 188, 220, 250, 290, 335]):
            radius = 67 + i * 44
            x = cx + radius * math.cos(math.radians(angle))
            y = cy + radius * math.sin(math.radians(angle))
            canvas.setFillColor(ORANGE if i % 2 == 0 else colors.HexColor('#7C9BB2'))
            canvas.circle(x, y, 5 + i * .5, stroke=0, fill=1)
        canvas.setFillColor(ORANGE)
        canvas.rect(MARGIN, PAGE_H - 75, 30, 4, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor('#C3D2DE'))
        canvas.setFont('BodyBold', 9)
        canvas.drawString(MARGIN, PAGE_H - 98, 'PORTFOLIO / COMPETENZE LAVORATIVE')
        canvas.setFont('Body', 9)
        canvas.drawString(MARGIN, 40, f'Edizione {self.edition} - Documento pubblico anonimizzato')
        canvas.restoreState()

    def page_chrome(self, canvas, doc):
        canvas.saveState()
        canvas.setFillColor(ORANGE)
        canvas.rect(MARGIN, PAGE_H - 37, 21, 3, stroke=0, fill=1)
        canvas.setFillColor(MUTED)
        canvas.setFont('BodyBold', 8)
        canvas.drawString(MARGIN + 29, PAGE_H - 38, 'ATLANTE DELLE COMPETENZE')
        canvas.setStrokeColor(LINE)
        canvas.line(MARGIN, 37, PAGE_W - MARGIN, 37)
        canvas.setFont('Body', 8)
        canvas.drawString(MARGIN, 23, f'Edizione {self.edition}')
        canvas.drawRightString(PAGE_W - MARGIN, 23, f'Pagina {doc.page}')
        canvas.restoreState()

    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph) and flowable.style.name == 'Chapter':
            label = flowable.getPlainText()
            key = 'chapter-' + re.sub(r'[^a-z0-9]+', '-', label.lower()).strip('-')
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(label, key, 0, False)
            self.notify('TOCEntry', (0, label, self.page, key))


def make_pdf(output, edition, planets):
    register_fonts()
    styles = {
        'cover': ParagraphStyle('CoverTitle', fontName='BodyBold', fontSize=36, leading=41,
                               textColor=colors.white, spaceAfter=21),
        'coverLead': ParagraphStyle('CoverLead', fontName='Body', fontSize=12, leading=19,
                                   textColor=colors.HexColor('#D8E3EB'), spaceAfter=16),
        'chapter': ParagraphStyle('Chapter', fontName='BodyBold', fontSize=24, leading=29,
                                 textColor=NAVY, spaceAfter=14),
        'title': ParagraphStyle('PageTitle', fontName='BodyBold', fontSize=24, leading=29,
                               textColor=NAVY, spaceAfter=18),
        'eyebrow': ParagraphStyle('Eyebrow', fontName='BodyBold', fontSize=8.4, leading=12,
                                 textColor=ORANGE, spaceAfter=9),
        'lead': ParagraphStyle('Lead', fontName='Body', fontSize=10.5, leading=15,
                              textColor=MUTED, spaceAfter=12),
        'body': ParagraphStyle('BodyText', fontName='Body', fontSize=9.7, leading=14.1,
                              textColor=INK, spaceAfter=6),
        'compactBody': ParagraphStyle('CompactBody', fontName='Body', fontSize=9.7, leading=13.1,
                                     textColor=INK, spaceAfter=4.5),
        'section': ParagraphStyle('Section', fontName='BodyBold', fontSize=11.5, leading=15.4,
                                 textColor=NAVY, spaceBefore=10, spaceAfter=7,
                                 keepWithNext=True),
        'compactSection': ParagraphStyle('CompactSection', fontName='BodyBold', fontSize=11.5, leading=15,
                                        textColor=NAVY, spaceBefore=8, spaceAfter=6,
                                        keepWithNext=True),
        'subtitle': ParagraphStyle('Subtitle', fontName='BodyBold', fontSize=14.4, leading=19,
                                  textColor=NAVY, spaceBefore=12, spaceAfter=8,
                                  keepWithNext=True),
        'small': ParagraphStyle('Small', fontName='Body', fontSize=8.5, leading=12.5,
                               textColor=MUTED, spaceAfter=8),
        'box': ParagraphStyle('Box', fontName='Body', fontSize=10, leading=15,
                             textColor=INK, spaceAfter=0),
    }

    def p(text, style='body'):
        # JSON is plain text: escape every value before passing it to ReportLab.
        return Paragraph(escape(text), styles[style])

    section_count = sum(len(detail['sections']) for _, detail in planets)
    story = [Spacer(1, 67), p('Atlante completo\ndelle competenze'.replace('\n', ' '), 'cover'),
             Paragraph('Sei pianeti.<br/>Tutti gli approfondimenti.', styles['coverLead']),
             p('Infrastrutture, dati, sviluppo software, sicurezza e supporto IT in un unico documento.', 'coverLead'),
             Spacer(1, 28)]
    for number, (planet, _) in enumerate(planets, 1):
        story.append(Paragraph(f'<font color="#D17B50">{number:02d}</font>  {escape(planet["name"])}',
                               styles['coverLead']))
    story += [NextPageTemplate('Body'), PageBreak(), p('Indice e guida alla lettura', 'title')]
    story.append(p(f'Il documento raccoglie i sei pianeti delle competenze lavorative e il testo integrale dei relativi approfondimenti: {section_count} sezioni tematiche, oltre a introduzioni e tecnologie.'))
    story.append(p('Le descrizioni dei pianeti offrono una panoramica; i capitoli successivi riportano tutte le attività e i casi tecnici disponibili nei contenuti pubblici.'))
    toc = TableOfContents()
    toc.levelStyles = [ParagraphStyle('TOC', fontName='Body', fontSize=10.2, leading=16,
                                     textColor=INK, leftIndent=0, firstLineIndent=0,
                                     spaceBefore=12, rightIndent=20)]
    story += [Spacer(1, 12), toc, Spacer(1, 24), p('Criterio editoriale', 'section'),
              p('Clienti e persone sono descritti in forma anonima. Importi, budget, preventivi, credenziali, indirizzi di rete, hostname e identificativi interni non vengono riportati.'),
              p('I nomi dei software e delle tecnologie restano espliciti. Materiali didattici e schemi progettuali mantengono la propria natura, senza attribuire docenza, certificazioni o messe in produzione non documentate.')]

    for number, (planet, detail) in enumerate(planets, 1):
        body_style = 'compactBody' if number == 2 else 'body'
        section_style = 'compactSection' if number == 2 else 'section'
        story += [PageBreak(), p(f'PIANETA {number:02d}', 'eyebrow'), p(planet['name'], 'chapter')]
        box = Table([[p(planet['description'], 'box')]], colWidths=[WIDTH])
        box.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), PALE),
            ('BOX', (0, 0), (-1, -1), .5, LINE),
            ('LEFTPADDING', (0, 0), (-1, -1), 13), ('RIGHTPADDING', (0, 0), (-1, -1), 13),
            ('TOPPADDING', (0, 0), (-1, -1), 12), ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ]))
        story += [box, Spacer(1, 9), p(planet['period'], 'small'),
                  p(detail['title'], 'subtitle'), p(detail['lead'], 'lead')]
        for paragraph in detail['paragraphs']:
            story.append(p(text_of(paragraph), body_style))
        for index, section in enumerate(detail['sections'], 1):
            story.append(p(f'{number:02d}.{index:02d}  {section["title"]}', section_style))
            for paragraph in section['paragraphs']:
                story.append(p(text_of(paragraph), body_style))
        tags = list(dict.fromkeys(planet['tags'] + detail['tags']))
        story += [p('Tecnologie e temi', 'section'), p(' · '.join(tags), 'small')]

    story += [PageBreak(), p('Integrazioni e perimetro documentale', 'chapter'),
              p('Le integrazioni recenti arricchiscono le sei aree esistenti con dettagli tecnici ricavati da procedure, archivi di codice, materiale formativo e schemi di flusso.'),
              p('Audit Windows e contesto delle identità', 'section'),
              p('Winlogbeat, GCPW, aggiornamento delle mappe SID, ingest Elasticsearch e consultazione Kibana. Gli arricchimenti interpretativi restano separati dagli eventi originali.'),
              p('Endpoint macOS e continuità della raccolta', 'section'),
              p('Filebeat come servizio launchd, Unified Logs, coda su disco, hardening, verifica dello stato e test sintetici.'),
              p('Connettività ibrida e supporto VPN', 'section'),
              p('Collegamenti Google Cloud e MikroTik con Cloud Router, BGP e IPsec; raccolta diagnostica PowerShell e pacchetti di evidenze per il supporto.'),
              p('Dati, schemi e caricamenti', 'section'),
              p('Analisi ETL MongoDB e BigQuery con Node.js, mapping, conversione dei tipi e denormalizzazione. Il flusso NeTEx/SAX/Hive è identificato come schema progettuale.'),
              p('Sicurezza degli endpoint e materiale Workspace', 'section'),
              p('Custodia e verifica delle chiavi BitLocker, procedure di recupero e materiale formativo su amministrazione Workspace, sicurezza, audit e governo dei dati.'),
              p('Provenienza e limiti', 'section'),
              p('Il quadro comprende registri formativi, procedure tecniche, codice e materiali didattici esaminati. Il testo mantiene distinta la descrizione di una procedura dalla prova di una specifica realizzazione o di un corso erogato.'),
              p('Il PDF deriva dai JSON pubblici dei sei pianeti e dei loro approfondimenti. Fonti originali riservate, schermate, fotografie e dati economici non vengono incorporati automaticamente.', 'small')]

    output.parent.mkdir(parents=True, exist_ok=True)
    document = CompetencyDocument(output, edition)
    document.multiBuild(story)
    return document.page, section_count


def main():
    parser = ArgumentParser()
    parser.add_argument('--date', default=date.today().isoformat())
    parser.add_argument('--output', type=Path, default=REPO / 'output/pdf/Report_completo_pianeti_competenze.pdf')
    args = parser.parse_args()
    edition_date = date.fromisoformat(args.date)
    months = ['', 'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
    edition = f'{edition_date.day} {months[edition_date.month]} {edition_date.year}'
    planets = load_content()
    validate_public_content(planets)
    pages, sections = make_pdf(args.output, edition, planets)
    print(f'PDF completo: {pages} pagine, {len(planets)} pianeti, {sections} sezioni.')
    print(args.output.resolve())


if __name__ == '__main__':
    main()
