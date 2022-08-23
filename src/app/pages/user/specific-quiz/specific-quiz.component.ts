import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-specific-quiz',
  templateUrl: './specific-quiz.component.html',
  styleUrls: ['./specific-quiz.component.css']
})
export class SpecificQuizComponent implements OnInit {

  constructor(private route:ActivatedRoute,private quizService:QuizService,private snack:MatSnackBar) { }
cid:any;
quizzes:any;
  ngOnInit(): void {
    this.route.params.subscribe(
      (data:any)=>{
      
          this.cid=data.qid
          if(this.cid==0){
            this.quizService.getAllQuiz().subscribe(
              (data)=>{
                
                this.quizzes=data
              },
              (error)=>{
                this.snack.open("Something went wrong,All Quiz cannot be loaded","ok",{
                  duration:3000
                })
              }
            )
          }
          else{
            this.quizzes=[]
            this.quizService.getQuiZByCategory(this.cid).subscribe(
              (data)=>{
                this.quizzes=data;
              },
              (error)=>{
                this.snack.open("Something went wrong, Quiz cannot loaded","ok",{
                  duration:3000
                })
              }
            )
          }
      },
      (error)=>{
        this.snack.open("SOmething went wrong,Category cannot be loaded","ok",{
          duration:3000
        })
      }
    )
  }

}
