import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { GestionserviceService } from '../../services/gestionservice.service';

@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrls: ['./postuler.component.scss']
})
export class PostulerComponent implements OnInit {

  postulationForm: FormGroup;
  currentStep = 1;
  submitted = false;
  isSubmitting = false;
  selectedFiles: { [key: string]: File } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gestionService: GestionserviceService 
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postulationForm = this.fb.group({
      // Étape 1: Informations Personnelles
      nip: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      sexe: ['', Validators.required],
      nationalite: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      // Étape 2: Formation
      niveauEtude: ['', Validators.required],
      domaineEtude: ['', Validators.required],

      // Étape 3: Stage
      typeStage: ['', Validators.required],
      domainStage: ['', Validators.required],
      dureeStage: ['', Validators.required],

      // Étape 4: Documents
      cv: [null, Validators.required],
      cnib: [null, Validators.required]
    });
  }

  // Getter pour faciliter l'accès aux contrôles du formulaire
  get f() { 
    return this.postulationForm.controls; 
  }

  nextStep() {
    this.submitted = true;

    // Vérifie la validité de l'étape courante
    if (this.isCurrentStepValid()) {
      this.currentStep++;
      this.submitted = false;
    } else {
      this.markCurrentStepAsTouched();
    }
  }

  previousStep() {
    this.currentStep--;
    this.submitted = false;
  }

  isCurrentStepValid(): boolean {
    const controls = this.f;
    
    switch(this.currentStep) {
      case 1:
        return !!(
          controls.nip.valid &&
          controls.nom.valid &&
          controls.prenom.valid &&
          controls.sexe.valid &&
          controls.nationalite.valid &&
          controls.email.valid
        );
      case 2:
        return !!(
          controls.niveauEtude.valid &&
          controls.domaineEtude.valid
        );
      case 3:
        return !!(
          controls.typeStage.valid &&
          controls.domainStage.valid &&
          controls.dureeStage.valid
        );
      case 4:
        return !!(
          controls.cv.valid &&
          controls.cnib.valid
        );
      default:
        return false;
    }
  }

  markCurrentStepAsTouched() {
    const controls = this.f;
    
    switch(this.currentStep) {
      case 1:
        ['nip', 'nom', 'prenom', 'sexe', 'nationalite', 'email'].forEach(
          field => controls[field].markAsTouched()
        );
        break;
      case 2:
        ['niveauEtude', 'domaineEtude'].forEach(
          field => controls[field].markAsTouched()
        );
        break;
      case 3:
        ['typeStage', 'domainStage', 'dureeStage'].forEach(
          field => controls[field].markAsTouched()
        );
        break;
      case 4:
        ['cv', 'cnib'].forEach(
          field => controls[field].markAsTouched()
        );
        break;
    }
  }

  onFileChange(event: any, type: string) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        alert('Le fichier est trop volumineux. Taille maximale: 5MB');
        return;
      }

      if (file.type !== 'application/pdf') {
        alert('Seuls les fichiers PDF sont acceptés');
        return;
      }

      this.selectedFiles[type] = file;
      this.postulationForm.patchValue({
        [type]: file
      });

      // Met à jour le label avec le nom du fichier
      const fileInput = event.target;
      if (fileInput.nextElementSibling) {
        fileInput.nextElementSibling.innerText = file.name;
      }
    }
  }

  async onSubmit() {
    this.submitted = true;

    if (this.postulationForm.valid) {
      this.isSubmitting = true;

      try {
        // Création du FormData pour l'envoi des fichiers
        const formData = new FormData();
        
        // Ajout des données du formulaire
        Object.keys(this.postulationForm.value).forEach(key => {
          if (key !== 'cv' && key !== 'cnib') {
            formData.append(key, this.postulationForm.value[key]);
          }
        });

        // Ajout des fichiers
        if (this.selectedFiles['cv']) {
          formData.append('cv', this.selectedFiles['cv']);
        }
        if (this.selectedFiles['cnib']) {
          formData.append('cnib', this.selectedFiles['cnib']);
        }

        // Ici, vous devrez implémenter l'appel à votre API
        // await this.postulationService.soumettreCandidature(formData);
        
        console.log(formData);

        await this.gestionService.soumettreCandidature(formData)
        .pipe(
          finalize(() => this.isSubmitting = false)
        )
        .subscribe({
          next: (response) => {
            alert('Votre candidature a été envoyée avec succès !');
            this.router.navigate(['/']);
          },
          error: (error) => {
            alert(error.message || 'Une erreur est survenue lors de l\'envoi de votre candidature.');
          }
        });
      } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        alert('Une erreur est survenue lors de l\'envoi de votre candidature.');
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.markCurrentStepAsTouched();
    }
  }
}
