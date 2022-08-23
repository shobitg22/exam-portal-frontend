import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  categoryData:any={
    cid:'',
  }
  constructor(private route:ActivatedRoute,private categoryService:CategoryService) { }

  ngOnInit(): void {
   this.categoryData.cid= this.route.snapshot.params['cid'];
   this.categoryService.getCategoryById(this.categoryData.cid).subscribe(
    (data)=>{
      this.categoryData=data
    },
    (error)=>{console.log(error)}
   )
  }

  formSubmit()
  {
    this.categoryService.updateCategory(this.categoryData).subscribe(
      (data)=>{
        Swal.fire({
          title: 'Success!',
          text: 'Category update Succesfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      },
      (error)=>{
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: 'category cannot be updated',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    )
  }
}
