import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'resume.pdf');
  const fileContents = await fs.readFile(filePath);

  const response = new NextResponse(fileContents);
  response.headers.set('Content-Type', 'application/pdf');
  response.headers.set('Content-Disposition', 'attachment; filename="resume.pdf"');

  return response;
}
