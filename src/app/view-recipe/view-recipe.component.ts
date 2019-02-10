import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Recipe, RecipeItem} from "../DbObjects"
import {ApiService} from "../api.service"
import { ActivatedRoute, Router }     from '@angular/router';
import { map }                from 'rxjs/operators';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {



  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        const id = params['recipe_id']
        this.apiService.getRecipe(id).then(recipe => {
          this.recipe = recipe
        })
      });
  }
    
    recipe : Recipe = {
    name: "",
    commitMsg:"N/A",
    items:[],
    steps:[],
    }
  
  editRecipe(){
    this.router.navigate(['/edit-recipe'], { queryParams: {recipe_id: this.recipe._id}});
    //this.router.navigate(["recipe/"+ element._id]);
  }
  

    

    constructor(private apiService : ApiService,
      private route : ActivatedRoute, private router: Router
      ) {
    }
    
    isEquipment(item: RecipeItem){
      return item.type === "equipment"
    }

    isIngredient(item: RecipeItem){
      return item.type === "ingredient"
    }

  public copyLink() {
  const el = document.createElement('textarea');
  el.value = window.location.href;
  console.log(el.value);
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

  }