import {CERTIFICATIONS, EDUCATION, EXPERIENCES, PROFILE_DATA, PROJECTS} from '../data/portfolioData';

function toPdfAscii(text: string): string {
  return text
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2022|\u25B8/g, '*')
    .replace(/[^\x20-\x7E]/g, ' ');
}

function escapePdfText(text: string): string {
  return toPdfAscii(text).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function wrapText(text: string, maxChars: number): string[] {
  const words = toPdfAscii(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxChars) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

interface PdfLine {
  text: string;
  font: 'F1' | 'F2';
  size: number;
  spaceAfter: number;
  indent?: number;
}

function buildCvLines(): PdfLine[] {
  const lines: PdfLine[] = [];

  const addHeading = (title: string) => {
    lines.push({text: '', font: 'F2', size: 10, spaceAfter: 6});
    lines.push({text: title.toUpperCase(), font: 'F2', size: 11, spaceAfter: 15});
  };

  const addWrapped = (
    text: string,
    font: 'F1' | 'F2' = 'F1',
    size = 9.5,
    maxChars = 92,
    indent = 0,
    spaceAfter = 12.5,
  ) => {
    const wrapped = wrapText(text, maxChars);
    wrapped.forEach((line, idx) => {
      lines.push({
        text: line,
        font,
        size,
        indent,
        spaceAfter: idx === wrapped.length - 1 ? spaceAfter : 12,
      });
    });
  };

  // Header
  lines.push({text: PROFILE_DATA.name.toUpperCase(), font: 'F2', size: 18, spaceAfter: 18});
  lines.push({
    text: 'Software Developer | UI/UX Designer (Figma)',
    font: 'F2',
    size: 11,
    spaceAfter: 14,
  });
  lines.push({
    text: `${PROFILE_DATA.email}  |  ${PROFILE_DATA.phone}  |  ${PROFILE_DATA.githubHandle}  |  ${PROFILE_DATA.location}`,
    font: 'F1',
    size: 9,
    spaceAfter: 14,
  });

  // Summary
  addHeading('Professional Summary');
  addWrapped(
    'Results-driven Software Developer with a Bachelor of Science in Computer Science and hands-on expertise in PHP and Laravel back-end development, MySQL database design, React.js front-end implementation, and UI/UX design in Figma. Proven ability to architect and deliver full-stack web applications from e-commerce platforms and booking systems to role-based management portals. Currently mentoring junior developers at Aptech in clean architecture and standardized engineering workflows.',
  );

  // Technical Skills
  addHeading('Technical Skills');
  addWrapped('Back-End: PHP, Laravel, Custom CMS, Role-Based Access Control (RBAC)');
  addWrapped('Front-End & UI/UX: React.js, JavaScript (ES6+), HTML5, CSS3, Figma, Canva');
  addWrapped('Databases: MySQL, SQL Server');
  addWrapped('Programming & Tools: Python (Intermediate), C# (Intermediate), Git, GitHub, VS Code, Jupyter Notebook, WordPress');

  // Experience
  addHeading('Professional Experience');
  for (const exp of EXPERIENCES) {
    lines.push({
      text: `${exp.role} | ${exp.company} (${exp.location}) - ${exp.duration}`,
      font: 'F2',
      size: 10,
      spaceAfter: 13,
    });
    for (const resp of exp.responsibilities) {
      addWrapped(`- ${resp}`, 'F1', 9.2, 88, 10, 12);
    }
  }

  // Projects
  addHeading('Key Projects');
  for (const proj of PROJECTS) {
    lines.push({
      text: `${proj.title} | ${proj.stack.join(', ')}`,
      font: 'F2',
      size: 10,
      spaceAfter: 12.5,
    });
    addWrapped(`- ${proj.summary}`, 'F1', 9.2, 88, 10, 12);
  }

  // Education & Certifications
  addHeading('Education');
  for (const edu of EDUCATION) {
    addWrapped(`${edu.degree} | ${edu.institution} (${edu.duration})`, 'F1', 9.5, 92, 0, 12.5);
  }

  addHeading('Certifications');
  for (const cert of CERTIFICATIONS) {
    addWrapped(`${cert.title} - ${cert.issuer}: ${cert.context}`, 'F1', 9.2, 92, 0, 12.5);
  }

  return lines;
}

function createPdfBlob(lines: PdfLine[]): Blob {
  const pageWidth = 612;
  const pageHeight = 792;
  const marginX = 48;
  const startY = 744;
  const bottomY = 48;

  const pages: string[] = [];
  let currentCommands: string[] = [];
  let cursorY = startY;

  for (const line of lines) {
    if (cursorY < bottomY) {
      pages.push(currentCommands.join('\n'));
      currentCommands = [];
      cursorY = startY;
    }

    if (line.text) {
      const x = marginX + (line.indent ?? 0);
      currentCommands.push(
        `BT /${line.font} ${line.size} Tf 1 0 0 1 ${x} ${cursorY.toFixed(1)} Tm (${escapePdfText(
          line.text,
        )}) Tj ET`,
      );
    }
    cursorY -= line.spaceAfter;
  }

  if (currentCommands.length > 0) {
    pages.push(currentCommands.join('\n'));
  }

  // Build PDF objects:
  // 1: Catalog, 2: Pages, 3: Font F1 (Helvetica), 4: Font F2 (Helvetica-Bold)
  // Then for each page i: Page obj (5 + i*2), Content obj (6 + i*2)
  const objects: string[] = [];
  const pageRefs: string[] = [];

  for (let i = 0; i < pages.length; i += 1) {
    const pageObjNum = 5 + i * 2;
    pageRefs.push(`${pageObjNum} 0 R`);
  }

  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  objects.push(`2 0 obj\n<< /Type /Pages /Kids [${pageRefs.join(' ')}] /Count ${pages.length} >>\nendobj\n`);
  objects.push('3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');
  objects.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n');

  for (let i = 0; i < pages.length; i += 1) {
    const pageObjNum = 5 + i * 2;
    const contentObjNum = 6 + i * 2;
    const stream = pages[i];

    objects.push(
      `${pageObjNum} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjNum} 0 R >>\nendobj\n`,
    );
    objects.push(
      `${contentObjNum} 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`,
    );
  }

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];

  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], {type: 'application/pdf'});
}

export function downloadCvPdf() {
  const lines = buildCvLines();
  const blob = createPdfBlob(lines);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Faiqa_Talib_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
