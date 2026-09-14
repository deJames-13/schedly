import { Component, ElementRef, output, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideUploadCloud, LucideImage, LucideFileText } from '@lucide/angular';

@Component({
  selector: 'app-file-dropzone',
  standalone: true,
  imports: [CommonModule, LucideUploadCloud, LucideImage, LucideFileText],
  template: `
    <div
      id="upload-dropzone"
      class="border-2 border-dashed rounded-[2px] p-8 sm:p-12 text-center transition-all cursor-pointer select-none"
      [ngClass]="{
        'border-[#1A365D] bg-blue-50/50 scale-[1.005]': isDragging(),
        'border-slate-300 hover:border-slate-400 bg-white': !isDragging()
      }"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
      (click)="triggerFileInput()"
      role="button"
      tabindex="0"
      (keydown.enter)="triggerFileInput()"
      (keydown.space)="triggerFileInput()"
      aria-label="Upload schedule document dropzone"
    >
      <input
        #fileInput
        type="file"
        class="hidden"
        accept="image/png, image/jpeg, image/webp, application/pdf"
        (change)="onFileSelected($event)"
      />

      <div class="max-w-md mx-auto flex flex-col items-center">
        <div class="w-14 h-14 bg-slate-100 text-[#1A365D] flex items-center justify-center rounded-[2px] mb-4 shadow-sm">
          <svg lucideUploadCloud class="w-7 h-7"></svg>
        </div>

        <h2 class="text-base sm:text-lg font-bold text-slate-900 mb-1">
          Drag & drop your schedule file here
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 mb-5">
          Or click to browse from local files. Accepts high-resolution smartphone photos, PDF documents, and scanned pages.
        </p>

        <button
          type="button"
          class="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#1A365D] hover:bg-[#2A4365] rounded-[2px] elevation-1 transition-all pointer-events-none"
        >
          Select Schedule Image / PDF
        </button>

        <div class="mt-6 flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          <span class="flex items-center gap-1">
            <svg lucideImage class="w-3.5 h-3.5"></svg> PNG, JPG, WebP
          </span>
          <span>•</span>
          <span class="flex items-center gap-1">
            <svg lucideFileText class="w-3.5 h-3.5"></svg> Multi-page PDF
          </span>
          <span>•</span>
          <span>Max 25MB</span>
        </div>
      </div>
    </div>
  `,
})
export class FileDropzoneComponent {
  readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  readonly isDragging = signal(false);

  readonly fileDropped = output<{ file: File; dataUrl: string }>();

  triggerFileInput(): void {
    this.fileInput()?.nativeElement.click();
  }

  onDragOver(e: DragEvent): void {
    e.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(e: DragEvent): void {
    e.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(e: DragEvent): void {
    e.preventDefault();
    this.isDragging.set(false);
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      this.processFile(e.dataTransfer.files[0]);
    }
  }

  onFileSelected(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.processFile(target.files[0]);
    }
  }

  private processFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = (event.target?.result as string) || '';
      this.fileDropped.emit({ file, dataUrl });
    };
    reader.readAsDataURL(file);
  }
}
