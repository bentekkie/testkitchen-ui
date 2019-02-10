import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Recipe,RecipeItem } from "../DbObjects"
import { ApiService } from "../api.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {


  ngOnInit() {
  }

    title = 'Make a new recipe';
    wipRecipe :Recipe = {
      name:"",
      items:[],
      steps:[],
      commitMsg:""
    };
    ingredients:RecipeItem[] = []
    equipments:RecipeItem[] = []
    tmpStep:string
    tmpEquipment:string
    tmpIngredient:string
    newTodo: string;
    recipeName: string;
    steps: string[];
    comments: string[];
    type: string;
    todoObj: any;
    typeMap : any;

    constructor( private apiService : ApiService, private router: Router
      ) {
      this.newTodo = '';
      this.recipeName = "";
      this.steps = [];
      this.comments = [];
      this.typeMap = 
      {
        "step": this.steps,
        "ingredient" : this.ingredients,
        "equipment" : this.equipments,
        "comment" : this.comments
      }
    }

    addTodo(event) {
      this.todoObj = {
        value: this.newTodo,
        type: this.type
      }
      if(this.type === 'step'){
      this.steps.push(this.todoObj);
      } if(this.type === 'ingredient'){
      this.ingredients.push(this.todoObj);
      } if(this.type === 'comment'){
      this.comments.push(this.todoObj);
      } if(this.type === 'equipment'){
      this.equipments.push(this.todoObj);
      }
      console.log(this.todoObj.value);
      this.newTodo = '';
      event.preventDefault();
    }
    
    addIngredient(name : string){
      this.ingredients.push({
        name,
        type:"ingredient",
        comments:[]
      })
    }
    
    addEquipment(name : string){
      this.equipments.push({
        name,
        type:"equipment",
        comments:[]
      })
    }
    
    addStep(description : string){
      this.wipRecipe.steps.push({
        description,
        comments:[],
        tags:[]
      })
    }

    addComment(item, index) {
     var listOfItems= document.getElementsByClassName(item.type)[0];
     console.log(listOfItems);
     console.log(index);
     var itemComment = listOfItems.querySelectorAll('#commentIn').item(index);
     console.log(itemComment as HTMLElement);
     (itemComment as HTMLElement).style.display= "block";
     var addCom = listOfItems.querySelectorAll('.delete-icon').item(index);
     (addCom as HTMLElement).style.display= "none";
   
    }
    
  drop(arr : any[] ,event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(arr, event.previousIndex, event.currentIndex);
    }
  }
  
  
  deleteElement(arr,index) {
    arr.splice(index, 1);
  }

  saveRecipe(){
    this.wipRecipe.items=[...this.ingredients,...this.equipments]
    if(this.wipRecipe.name.length === 0){
      alert("You have to enter a name")
    }else{
      console.log(this.wipRecipe)
      this.apiService.postRecipe(this.wipRecipe).then(valid => {
        if(valid){
          console.log("added")
          this.router.navigate(["/home"]);
        }
      })
    }
  }

  }