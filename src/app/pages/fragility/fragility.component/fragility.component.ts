import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-fragility',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './fragility.component.html',
  styleUrls: ['./fragility.component.css']
})
export class FragilityComponent {
  imageSrc: string | null = null;
  selectedFile: File | null = null;
  uploadedFilename: string | null = null;
  showPreview = false;

  detectionLabel: string | null = null;
  detectionConfidence: number | null = null;
  gradcamImage: string | null = null; // ✅ Declared here

  isUploading = false;
  isDetecting = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

   previewImage(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file && file.type.startsWith('image/')) {
    this.selectedFile = file;
    this.uploadedFilename = null; // ✅ Reset filename on new selection
    this.detectionLabel = null;
    this.detectionConfidence = null;
    this.gradcamImage = null;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as string;
      this.showPreview = true;
      this.cdr.detectChanges();
    };

    reader.onerror = () => {
      console.error('Error reading file:', reader.error);
      this.clearPreview();
    };

    reader.readAsDataURL(file);
  } else {
    this.clearPreview();
  }
}

  handleUpload(): void {
  if (!this.selectedFile) {
    alert('Please select an image first.');
    return;
  }

  const formData = new FormData();
  formData.append('image', this.selectedFile);

  this.isUploading = true;

  this.http.post<any>('http://localhost:5000/upload', formData).subscribe({
    next: (response) => {
      console.log('Upload successful:', response);
      this.uploadedFilename = response.filename;
      this.isUploading = false;
      this.cdr.detectChanges(); // ✅ Force UI update
    },
    error: (err) => {
      console.error('Upload failed:', err);
      this.isUploading = false;
      this.cdr.detectChanges(); // ✅ Ensure UI reflects failure
    }
  });
}

  handleDetect(): void {
    if (!this.uploadedFilename) {
      alert('Please upload an image first.');
      return;
    }

    const payload = { filename: this.uploadedFilename };

    this.isDetecting = true;
    this.detectionLabel = null;
    this.detectionConfidence = null;
    this.gradcamImage = null;

    this.http.post<any>('http://localhost:5000/detect', payload).subscribe({
      next: (response) => {
        this.detectionLabel = response.label;
        this.detectionConfidence = response.confidence;
        if (response.gradcam) {
          this.gradcamImage = 'data:image/jpeg;base64,' + response.gradcam;
        }
        this.isDetecting = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Detection failed:', err);
        this.isDetecting = false;
      }
    });
  }

  private clearPreview(): void {
    this.selectedFile = null;
    this.imageSrc = null;
    this.uploadedFilename = null;
    this.showPreview = false;
  }
}