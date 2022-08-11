import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {

  quizData:any=[
    // {
    //   title:"title1",
    // description:"description1",
    // maxMarks:100,
    // numberOfQuestions:20,
    // isActive:false,
    // category:{
    //   title:"categoryname1"
    // }
    // },
    // {
    //   title:"title2",
    // description:"description2",
    // maxMarks:100,
    // numberOfQuestions:20,
    // isActive:false,
    // category:{
    //   title:"categoryname2"
    // }
    // },
    // {
    //   title:"title3",
    //   description:"description3",
    //   maxMarks:100,
    //   numberOfQuestions:20,
    //   isActive:false,
    //   category:{
    //     title:"categoryname3"
    //   }
    // }
  ]
    
  
  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizService.getAllQuiz().subscribe(
      (data)=>{this.quizData=data
      console.log(data)
      },
      (error)=>{console.log(error)}
    )
  }

  deleteQuiz(qid:any){
    Swal.fire({
      title: 'Info!',
      text: 'Do you want to delete quiz',
      icon: 'info',
      confirmButtonText: 'Ok',
      cancelButtonText:'Cancel',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this.quizService.deleteQuiz(qid).subscribe(
          (data)=>{
            Swal.fire({
              title: 'Success!',
              text: 'quiz deleted Succesfully',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            this.quizData=this.quizData.filter((quiz:any)=>quiz.qid!==qid)
          },
          (error)=>{
            console.log(error);
          }
        )
      }
    })




    
  }

}
