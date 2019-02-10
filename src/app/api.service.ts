import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Recipe,User} from "./DbObjects"

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private basePath = '/api/'
  constructor(private http: HttpClient) { }
  
  public async getRecipe(id : string){
    return await this.get(`recipe/${id}`).then(resp => {
      console.log(resp)
      if('error' in resp){
        return null
      }else{
        return resp as Recipe
      }
    })
  }
  
  public async getTree(){
    return await this.get("recipe/tree").then(resp => {
      return resp
    })
  }
  public async getRecipes(options ?: {
    mine?:boolean,
    authorId?:string
  }){
    return await this.get('recipe',options).then(resp => {
      if('error' in resp){
        return []
      }else{
        return resp as Recipe[]
      }
    })
  }
  
  public async getUsers() {
    return await this.get('user').then((resp : User[]) => {
      return resp
    })
  }
  
  public async branchRecipe(oldRecipe: Recipe,recipe : Recipe) {
    return await this.post(`recipe/${oldRecipe._id}`,recipe).then(resp => {
      console.log(resp)
      if('error' in resp){
        return false
      }
      return true
    })
  }
  
  public async postRecipe(recipe : Recipe) {
    return await this.post('recipe',recipe).then(resp => {
      console.log(resp)
      if('error' in resp){
        return false
      }
      return true
    })
  }
  
  public async login(username : string, password : string){
    return await this.post(`auth/login`,{
      username:username,
      password:password
    }).then(resp => {
      console.log(resp)
      if('error' in resp){
        return false
      }
      return true
    })
    
  }
  public async register(username:string, password: string){
    return await this.post("auth/register",{
      username,
      password
    }).then(resp => {
      console.log(resp)
      if('error' in resp){
        return false
      }
      return true
    })
  }
  
  public async isLoggedIn(){
    return this.get('isLoggedin').then(res => true).catch(e => false)
  }
  
  public async logout(){
    return this.get('auth/logout')
  }
  
  private async get(path :string, params?: {[key: string]: any}){
    const options = (params)?{params:params}:{}
    return this.http.get(this.basePath+path,options).toPromise()
  }
  
  private async post(path :string,formData :{
    [key: string]:any
  }){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post(this.basePath+path,formData,httpOptions).toPromise()
  }
}
