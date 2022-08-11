import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories:any=[]

  quiz=
    {
      title:"",
      description:"",
      maxMarks:'',
      numberOfQuestions:'',
      isActive:'',
      category:{
        cid:''
      },
    }

  constructor(private categoryService:CategoryService,private quizService:QuizService,private route:Router) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
    (data)=>{this.categories=data},
    (error)=>{console.log(error)}
    )
  }

  formSubmit(){
    this.quizService.addQuiz(this.quiz).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire({
          title: 'Success!',
          text: 'Quiz added Succesfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })

        this.route.navigate(['admin/quiz'])
      },
      (error)=>{
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: 'Quiz cannot be added',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    )
  }

}
