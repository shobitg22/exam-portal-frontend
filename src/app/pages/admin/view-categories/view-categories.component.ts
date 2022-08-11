import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

categoryData:any=[

  // {
  //   title:"java",
  //   description:"dummy1"
  // },
  // {
  //   title:"java2",
  //   description:"dummy2"
  // },
  // {
  //   title:"java3",
  //   description:"dummy3"
  // },
  // {
  //   title:"java4",
  //   description:"dummy4"
  // }
]

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {

    this.categoryService.getAllCategories().subscribe(
      (data:any)=>{
        this.categoryData=data;
        console.log(data);
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  deleteCategory(cid:any){
    Swal.fire({
      title: 'Info!',
      text: 'Do you want to delete',
      icon: 'info',
      confirmButtonText: 'Ok',
      showCancelButton:true,
      cancelButtonText:'cancel'
    }).then((result)=>{
      if(result.isConfirmed){
        this.categoryService.deleteCategory(cid).subscribe(
          (data)=>{
            Swal.fire({
              title: 'Success!',
              text: 'Category Deleted sucessfully',
              icon: 'success',
              confirmButtonText: 'Ok',
            })
            this.categoryData=this.categoryData.filter((cat:any)=>cat.cid!==cid)
          },
          (error)=>{
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        )
      }
    })
  }

}
