import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryData={
    title:'',
    description:''
  }
  
  constructor(private categoryService:CategoryService,private route:Router) { }

  ngOnInit(): void {
  }
  formSubmit(){
    this.categoryService.addCategory(this.categoryData).subscribe(
      (data)=>{
        Swal.fire({
          title: 'Success!',
          text: 'Category added Succesfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      this.route.navigate(['admin/categories'])
      },
      (error)=>{
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: 'Category cannot be added',
          icon: 'error',
          confirmButtonText: 'Ok'
        })}
    )
  }

}
