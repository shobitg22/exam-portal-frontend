import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  title=""
  quizId=""
  questions:any=[]
  constructor(private quizService:QuizService,private route:ActivatedRoute,private questionService:QuestionService) { }

  ngOnInit(): void {
    this.quizId=this.route.snapshot.params['qId'];
    this.quizService.getQuizById(this.quizId).subscribe(
      (data:any)=>{
        this.title=data.title},
      (error)=>{console.log(error)}
    
    )

    this.questionService.getQuestionByQuizAdmin(this.quizId).subscribe(
      (data)=>{
        this.questions=data
      },
      (error)=>{console.log(error)}
    )
  }

  deleteQuestion(quesId:any){
    Swal.fire({
      title: 'Info!',
      text: 'Do you want to delete',
      icon: 'info',
      confirmButtonText: 'Ok',
      showCancelButton:true,
      cancelButtonText:'Cancel'
    }).then((result)=>{
      if(result.isConfirmed){
         this.questionService.deleteQuestions(quesId).subscribe(
          (data)=>{
            Swal.fire({
              title: 'Success!',
              text: 'Question delete sucessfulyy',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            this.questions=this.questions.filter((ques:any)=>ques.quesId!==quesId)
          },
          (error)=>{console.log(error)}
         )
      }
    })
  }

}
