import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  categories:any=[]

  quiz:any=
    {
      qId:"",
      title:"",
      description:"",
      maxMarks:'',
      numberOfQuestions:'',
      isActive:'',
      category:{
        cid:''
      },
    }

  constructor(private categoryService:CategoryService,private route:ActivatedRoute,private quizService:QuizService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data)=>{
        this.categories=data
      },
      (error)=>{
        console.log(error)
      }
     )
     this.quiz.qId=this.route.snapshot.params['qId']
     this.quizService.getQuizById(this.quiz.qId).subscribe(
      (data)=>{this.quiz=data},
      (error)=>{console.log(error)}
     )
  }

  formSubmit(){
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire({
          title: 'Success!',
          text: 'Quiz updated Succesfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      },
      (error)=>{console.log(error)}
    )
  }
}
