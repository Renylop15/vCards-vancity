import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vcard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Pantalla de Carga -->
    <div *ngIf="loading" class="min-h-screen bg-gray-50 flex items-center justify-center">
      <p class="text-gray-500 animate-pulse">Cargando perfil...</p>
    </div>

    <!-- Pantalla de Error -->
    <div *ngIf="error" class="min-h-screen bg-gray-50 flex items-center justify-center">
      <p class="text-red-500 font-bold">Ejecutiva no encontrada o inactiva.</p>
    </div>

    <!-- Interfaz de la vCard (Responsive Móvil / Escritorio) -->
    <div *ngIf="!loading && !error && vcardData" class="min-h-screen bg-gray-200 flex items-center justify-center font-sans md:py-12">
      
      <!-- Contenedor Principal (Tarjeta / Teléfono) -->
      <div class="w-full max-w-md bg-gray-50 shadow-2xl relative flex flex-col min-h-screen md:min-h-0 md:rounded-3xl overflow-hidden md:border border-gray-300">
        
        <!-- Sección Superior (Azul Marino) -->
        <div class="bg-[#172544] text-white pt-10 pb-8 px-6 flex flex-col items-center">
          
          <!-- Logo Vancity -->
          <img src="logo-vancity.png" alt="Vancity" class="h-24 mb-8 object-contain">

          <!-- Foto de Perfil -->
          <img class="w-48 h-48 object-cover rounded-full shadow-lg mb-4 bg-gray-300" 
               [src]="vcardData.photo_url" 
               alt="Foto de Perfil">
               
          <!-- Nombre y Puesto -->
          <h2 class="text-2xl font-semibold tracking-wide text-center">{{ vcardData.first_name }} {{ vcardData.last_name }}</h2>
          <p class="text-sm font-light text-gray-300 mt-1 text-center">{{ vcardData.job_title }} en Vancity</p>

          <!-- Botones Circulares -->
          <div class="flex justify-center gap-5 mt-8 w-full">
            <!-- Llamar -->
            <a [href]="'tel:' + vcardData.phone" class="flex flex-col items-center gap-2 group">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center text-[#172544] shadow-md group-hover:bg-gray-200 transition">
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <span class="text-[10px] sm:text-xs font-light text-white mt-1">Llamar</span>
            </a>

            <!-- Mensaje (WhatsApp) -->
            <a [href]="'https://wa.me/' + vcardData.whatsapp" target="_blank" class="flex flex-col items-center gap-2 group">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center text-[#172544] shadow-md group-hover:bg-gray-200 transition">
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
              </div>
              <span class="text-[10px] sm:text-xs font-light text-white mt-1">Mensaje</span>
            </a>

            <!-- Correo -->
            <a [href]="'mailto:' + vcardData.email" class="flex flex-col items-center gap-2 group">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center text-[#172544] shadow-md group-hover:bg-gray-200 transition">
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <span class="text-[10px] sm:text-xs font-light text-white mt-1">Correo</span>
            </a>

            <!-- Sitio Web -->
            <a href="https://vancity.mx" target="_blank" class="flex flex-col items-center gap-2 group">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center text-[#172544] shadow-md group-hover:bg-gray-200 transition">
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
              </div>
              <span class="text-[10px] sm:text-xs font-light text-white mt-1">Web</span>
            </a>
          </div>
        </div>

        <!-- Botón de Guardar -->
        <div class="p-8 bg-gray-50">
          <button (click)="downloadVcf()" class="w-full bg-[#2a3d5e] text-white py-4 rounded-lg font-semibold shadow-md hover:bg-[#172544] transition">
            + Añadir a Contactos
          </button>
        </div>

      </div>
    </div>
  `,
})
export class VcardComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private supabase = inject(SupabaseService);
  
  vcardData: any = null;
  loading: boolean = true;
  error: boolean = false;

  ngOnInit() {
    console.log('1. Iniciando componente, leyendo URL...');
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      console.log('2. URL detectada con identificador:', slug);
      
      if (slug) {
        this.loadProfile(slug);
      } else {
        this.error = true;
        this.loading = false;
      }
    });
  }

  async loadProfile(slug: string) {
    try {
      console.log('3. Buscando a la ejecutiva en Supabase...');
      this.loading = true;
      this.error = false;
      this.vcardData = await this.supabase.getVcardBySlug(slug);
      console.log('4. ¡Datos obtenidos con éxito!', this.vcardData);
    } catch (err) {
      console.error('Error crítico al consultar Supabase:', err);
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  downloadVcf() {
    if (!this.vcardData) return;
    
    // Generación dinámica del texto VCF
    const vcfText = `BEGIN:VCARD
VERSION:3.0
N:${this.vcardData.last_name};${this.vcardData.first_name};;;
FN:${this.vcardData.first_name} ${this.vcardData.last_name}
ORG:Vancity
TITLE:${this.vcardData.job_title}
TEL;TYPE=WORK,VOICE:${this.vcardData.phone}
TEL;TYPE=CELL,VOICE:${this.vcardData.whatsapp}
EMAIL;TYPE=WORK:${this.vcardData.email}
END:VCARD`;

    // Lógica para forzar la descarga en el navegador
    const blob = new Blob([vcfText], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.vcardData.first_name}_${this.vcardData.last_name}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}