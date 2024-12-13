import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

  loginData = {
    username: '',
    password: ''
  };
  
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    if (!this.loginData.username || !this.loginData.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }
console.log(this.loginData);
    this.isLoading = true;
    this.errorMessage = null;

    try {
      const result = await this.authService.login(this.loginData);
      if (result) {
        // Redirection après connexion réussie
        this.router.navigate(['/dashboard']);
      }else {
        this.errorMessage = 'Identifiants incorrects';
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'Une erreur est survenue lors de la connexion';
    } finally {
      this.isLoading = false;
    }
  }
}
