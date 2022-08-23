import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attempt-quiz',
  templateUrl: './attempt-quiz.component.html',
  styleUrls: ['./attempt-quiz.component.css'],
})
export class AttemptQuizComponent implements OnInit {
  qid: any;
  correctAnswer=0;
  attemptedQuestion=0;
  marksObtained=0;
  isSubmit=false;
  timer:any;
  t:any
  question =[ {
    content: '',
    image: null,
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    quesId: null,
    givenAnswer:'',
    quiz:{
      title:null,
      description:null,
      maxMarks:0,
    }
  }]
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private quizService: QuizService,
    private location: LocationStrategy
  ) {
    history.pushState(null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, window.location.href);
    });
  }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['qid'];
    this.questionService.getQuestionByQuiz(this.qid).subscribe(
      (data:any) => {
        this.question=data
      },
      (error) => {
        console.log(error);
      }
    );
    this.timer=this.question.length *1 *60;
    this.startTimer()
  }

  submitQuiz() {
    
    Swal.fire({
      title: 'Submit !',
      text: 'Do you want to Submit the quiz',
      icon: 'info',
      confirmButtonText: 'Ok',
      showCancelButton:true,
      cancelButtonText:'Cancel'
    }).then((result)=>{

      if(result.isConfirmed){
       this.confirmQuizSubmission()
      }
    });
  }

  confirmQuizSubmission(){
    //CLIENT SIDE EVALUATIONS
    // this.isSubmit=true;
    // console.log(this.question)
    // this.question.forEach((ques)=>{
    //   if( ques.answer==ques.givenAnswer){
    //     this.correctAnswer++;
    //     let singleMarks=this.question[0].quiz.maxMarks / this.question.length;
    //     this.marksObtained+=singleMarks;
    //   }
    //   if( ques.givenAnswer.trim()!='' ){
    //     this.attemptedQuestion++;
    //   }

    // })

//SERVER SIDE EVALUATION
clearInterval(this.t);

    this.questionService.evalQuestions(this.question).subscribe(
      (data:any)=>{
          this.marksObtained=data.marksObtained
          this.correctAnswer=data.correctAnswer
          this.attemptedQuestion=data.attemptedQuestion
          this.isSubmit=true
      },
      (error)=>{console.log(error)
        Swal.fire({
          title: 'Error!',
          text: 'Quiz cannot be evaluated',
          icon: 'error',
          confirmButtonText: 'Ok'
        })}
    )
  }

  startTimer(){
     this.t = window.setInterval(()=>{
      if(this.timer<=0){
        this.confirmQuizSubmission()
        
      }else{
        this.timer--;
      }
     
    },1000)
  }
  getFormatedTime()
  {
    let mm= Math.floor(this.timer/60)
    let ss = this.timer-mm *60
    return `${mm} min : ${ss} sec`
  }

  printPage(){
    window.print()
  }
}
