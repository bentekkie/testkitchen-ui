import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Recipe, RecipeItem} from "../DbObjects"
import {ApiService} from "../api.service"
import { ActivatedRoute, Router }     from '@angular/router';
import { map }                from 'rxjs/operators';


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {

  constructor(private apiService : ApiService,
      private route : ActivatedRoute, private router: Router
      ) {
    }
    oldRecipe : Recipe
    wipRecipe : Recipe = {
    name: "",
    commitMsg:"",
    items:[],
    steps:[],
    }
    ingredients:RecipeItem[] = []
    equipments:RecipeItem[] = []
    editSteptmp: string
    editStepI: number
    editIngredienttmp: string
    editIngredientI: number
    editEquipmenttmp: string
    editEquipmentI: number
    tmpStep:string
    tmpEquipment:string
    tmpIngredient:string
    
    editStep(index:number){
      document.getElementById('editStep').style.display='block';
      this.editSteptmp = this.wipRecipe.steps[index].description
      this.editStepI = index
    }
    
    saveStep(){
      this.wipRecipe.steps[this.editStepI].description = this.editSteptmp
      document.getElementById('editStep').style.display='none';
    }
    
    editIngredient(index:number){
      document.getElementById('editIngredient').style.display='block';
      this.editIngredienttmp = this.ingredients[index].name
      this.editIngredientI = index
    }
    
    saveIngredient(){
      this.ingredients[this.editIngredientI].name = this.editIngredienttmp
      document.getElementById('editIngredient').style.display='none';
    }
    
    editEquipment(index:number){
      document.getElementById('editEquipment').style.display='block';
      this.editEquipmenttmp = this.equipments[index].name
      this.editEquipmentI = index
    }
    
    saveEquipment(){
      this.equipments[this.editEquipmentI].name = this.editEquipmenttmp
      document.getElementById('editEquipment').style.display='none';
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
    

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        const id = params['recipe_id']
        this.apiService.getRecipe(id).then(recipe => {
          this.oldRecipe = recipe
          this.ingredients = recipe.items.filter(({type}) => type === "ingredient")
          this.equipments = recipe.items.filter(({type}) => type === "equipment")
          this.wipRecipe = recipe
          this.wipRecipe.previous = recipe.created
        })
      });
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
      this.apiService.branchRecipe(this.oldRecipe,this.wipRecipe).then(valid => {
        if(valid){
          console.log("added")
          this.router.navigate(["/all-recipes"]);
        }
      })
    }
  }

}
