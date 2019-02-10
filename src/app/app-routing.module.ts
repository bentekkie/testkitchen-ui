import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { CreateRecipeComponent } from './create-recipe/create-recipe.component'
import { RegisterComponent } from './register/register.component'
import { AllRecipesComponent } from './all-recipes/all-recipes.component'
import { ViewRecipeComponent } from './view-recipe/view-recipe.component'
import { HomePageComponent } from './home-page/home-page.component'
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component'
import { TreeViewComponent } from './tree-view/tree-view.component'
import { AuthGuard} from "./auth.guard"

const routes: Routes = [
  {path:'create-recipe',component: CreateRecipeComponent, canActivate: [AuthGuard]},
  {path: 'all-recipes', component: AllRecipesComponent , canActivate: [AuthGuard]},
  {path: 'view-recipe', component: ViewRecipeComponent , canActivate: [AuthGuard]},
  {path: 'edit-recipe', component: EditRecipeComponent , canActivate: [AuthGuard]},
  {path: 'tree-view', component: TreeViewComponent , canActivate: [AuthGuard]},
  {path: 'home', component: HomePageComponent },
  {path: '', component: HomePageComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
