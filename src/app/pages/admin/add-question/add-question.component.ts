import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  title=''
  quizId=''

  question={
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
  constructor(private route:ActivatedRoute,private quizService:QuizService,private questionService:QuestionService,private router:Router) { }

  ngOnInit(): void {
    this.quizId=this.route.snapshot.params['qId']
    this.quizService.getQuizById(this.quizId).subscribe(
      (data:any)=>{
        this.title=data.title
      },
      (error)=>{console.log(error)}
    )
  }
  formSubmit(){

  this.question.quiz.qid=this.quizId;
  this.questionService.createQuestion(this.question).subscribe(
    (data)=>{
      Swal.fire({
        title: 'Success!',
        text: 'Question added Succesfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    this.router.navigate(['admin/view-questions/'+this.question.quiz.qid])
    },
    (error)=>{console.log(error)
      Swal.fire({
        title: 'Error!',
        text: 'Question cannot be added',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  )
  }

}

