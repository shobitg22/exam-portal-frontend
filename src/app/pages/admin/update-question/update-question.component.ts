import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  title=''
  quizId=''

  question={
    quesId:'',
    answer:'',
    content:'',
    image:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    quiz:{
      qid:''
    }
  }
  constructor(private route:ActivatedRoute,private quizService:QuizService,private questionService:QuestionService) { }

  ngOnInit(): void {
    this.quizId=this.route.snapshot.params['qId']
    this.question.quesId=this.route.snapshot.params['quesId']
    this.quizService.getQuizById(this.quizId).subscribe(
      (data:any)=>{
        this.title=data.title
      },
      (error)=>{console.log(error)}
    )
    this.questionService.getQUestionById(this.question.quesId).subscribe(
      (data:any)=>{
        console.log(data)
        this.question=data
      },
      (error)=>{console.log(error)}
    )
  }

  formSubmit(){
      this.questionService.updateQuestion(this.question).subscribe(
        (data)=>{
          console.log(data)
          Swal.fire({
            title: 'Success!',
            text: 'Question updated Succesfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        },
        (error)=>{console.log(error)}
      )
  }
}
