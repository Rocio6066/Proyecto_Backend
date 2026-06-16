import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {

  private supabase;

  constructor() {

    this.supabase = createClient(
      'https://pzasdfnbbglpoyahxabn.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6YXNkZm5iYmdscG95YWh4YWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMzYyNDEsImV4cCI6MjA5NjcxMjI0MX0.WovfxtSE0h4ErvFPyrdgVuNvpFZ2TGpM4KnkCUaUwd0'
    );
  }

  async uploadImage(file: Express.Multer.File) {

  if (!file?.buffer) {
    throw new Error('Archivo inválido: buffer vacío');
  }

  const fileName = `${Date.now()}-${file.originalname}`;

  const { data, error } = await this.supabase
    .storage
    .from('productos')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    console.log('🔥 SUPABASE ERROR COMPLETO:', error);
    throw error;
  }

  const { data: publicUrl } = this.supabase
    .storage
    .from('productos')
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
}

// 🗑️ ELIMINAR IMAGEN DE SUPABASE
async deleteImage(fileName: string) {

  const { data, error } = await this.supabase
    .storage
    .from('productos')
    .remove([fileName]);

  if (error) {
    console.log('🔥 ERROR SUPABASE DELETE:', error);
    throw error;
  }

  return { data, error };
}
}