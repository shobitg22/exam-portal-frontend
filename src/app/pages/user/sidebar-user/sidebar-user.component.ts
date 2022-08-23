import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit {

  categories:any;
  constructor(private categoryService:CategoryService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data)=>{
        this.categories=data;
      },
      (error)=>{
        this._snack.open("Categories cannot be fetch","ok",{
          duration:3000
        })     
      }
    )
  }

}
