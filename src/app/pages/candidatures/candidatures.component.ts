import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Candidature } from '../../models/Candidature';
import { Subject } from 'rxjs';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { GestionserviceService } from '../../services/gestionservice.service';
import { CommonModule } from '@angular/common';
import { MatCardContent } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  standalone:true,
  imports:[
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule
  ],
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.scss']
})
export class CandidaturesComponent implements OnInit {

   candidatureListe!:Candidature[];
   dataSource:any;
   displayedColumns:string[]=["id","nom","prenom","typeStage","statut","dureeStage","action"];
   @ViewChild(MatPaginator) paginator!:MatPaginator;
   @ViewChild(MatSort) sort!:MatSort;

  constructor(private gestionService:GestionserviceService) { }

  ngOnInit(): void {
    this.toutCandidature()
  }

  toutCandidature(){
    this.gestionService.allCandidature().subscribe(item =>{ 
      this.candidatureListe = item
    
      this.dataSource=new MatTableDataSource<Candidature>(this.candidatureListe)
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
      // this.dttrigger.next(null);
  }

  FilterChange(data:Event){
    const Value=(data.target as HTMLInputElement).value;
    this.dataSource.filter=Value;
  }
}
