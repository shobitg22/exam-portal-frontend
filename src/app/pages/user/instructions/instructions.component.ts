import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
qid:any;
quiz:any;
question:any;
  constructor(private router:ActivatedRoute,private quizService:QuizService,
    private questionService:QuestionService,private route:Router) { }

  ngOnInit(): void {
    this.qid=this.router.snapshot.params['qid']
    this.quizService.getQuizById(this.qid).subscribe(
      (data)=>{
        this.quiz=data
      },
      (error)=>{console.log(error)
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    )

    this.questionService.getQuestionByQuiz(this.qid).subscribe(
      (data)=>{this.question=data},
      (error)=>{console.log(error)}
    )
  }

  startQuiz(){
    Swal.fire({
      title: 'START !',
      text: 'Do you want to start the quiz',
      icon: 'info',
      confirmButtonText: 'Ok',
      showCancelButton:true,
      cancelButtonText:'Cancel'
    }).then((result)=>{
      if(result.isConfirmed){
        this.route.navigate(['/attempt/'+this.qid])
      }
    })
  }
}
