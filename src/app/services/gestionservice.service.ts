import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidature } from '../models/Candidature';
import { catchError } from 'rxjs/operators';
import { Observable ,throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionserviceService {

   CANDIDATURE_URL='HTTP://localhost:8080/candidatures/'

  constructor(private http:HttpClient) { }

  
  allCandidature():Observable<Candidature[]>{
    return this.http.get<Candidature[]>(this.CANDIDATURE_URL +'all')
  }

  soumettreCandidature(formData: FormData): Observable<any> {
    return this.http.post(`${this.CANDIDATURE_URL}creer`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Récupérer une candidature spécifique
  getCandidature(id: string): Observable<Candidature> {
    return this.http.get<Candidature>(`${this.CANDIDATURE_URL}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }



  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      switch (error.status) {
        case 400:
          errorMessage = 'Données de candidature invalides';
          break;
        case 401:
          errorMessage = 'Non autorisé';
          break;
        case 413:
          errorMessage = 'Fichiers trop volumineux';
          break;
        case 415:
          errorMessage = 'Format de fichier non supporté';
          break;
        case 500:
          errorMessage = 'Erreur serveur';
          break;
        default:
          errorMessage = `Erreur ${error.status}: ${error.error.message}`;
      }
    }

    console.error('Erreur:', error);
    return throwError(() => new Error(errorMessage));
  }
}
