import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Recipe} from "../DbObjects"
import {ApiService} from "../api.service"
import {Router} from "@angular/router"

/**
 * @title Table with filtering
 */
@Component({
  selector: 'all-recipes',
  styleUrls: ['all-recipes.component.scss'],
  templateUrl: 'all-recipes.component.html',
})
export class AllRecipesComponent {
  recipes : Recipe[] = []
  displayedColumns: string[] = ['name', 'commitMsg', 'author', 'created', 'share'];
  dataSource = new MatTableDataSource(this.recipes);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
   ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.apiService.getUsers().then(users => {
      this.apiService.getRecipes().then(recipes => {
        for(let i = 0; i < recipes.length; i++){
          recipes[i].authorId = users.find(user => user._id === recipes[i].authorId).username
        }
        this.recipes = recipes
        this.dataSource = new MatTableDataSource(this.recipes)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    })
    
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor( private apiService : ApiService,private router: Router){
    
  }
  
  public formatDate(time :number){
    return new Date(time).toString()
  }
  
  public pageLink(element){
    this.router.navigate(['/view-recipe'], { queryParams: {recipe_id: element._id}});
    //this.router.navigate(["recipe/"+ element._id]);
  }
  
  public copyLink(element) {
  const el = document.createElement('textarea');
  el.value = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + this.router.createUrlTree(['/view-recipe'], { queryParams: {recipe_id: element._id}}).toString();
  console.log(el.value);
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

}


