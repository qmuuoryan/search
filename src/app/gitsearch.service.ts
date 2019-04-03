// import { environment } from './environments/environment';
import {Promise} from 'es6-promise';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Repository } from './repository';
import { HttpClient, } from '@angular/common/http';
import {  Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GitsearchService {

  private username:string;
  user:User;
  repos:Repository;
  reposArray:any;
  BaseUrl = "https://api.github.com/users/";
  FinalUrl ="?client_id=421d167c426011c56673&client_secret=b34e4a54786aa307d02411de1dab68a76c95590b";
  Api= "5e5a794458566efb867bbd0bfdcaa45ddb31da2d"
  ;
  

  constructor(private http: Http) {
    this.username = "qmuuoryan";
    this.user= new User ("","","",0,0,0,"");
    this.repos = new Repository("","","");
    this.reposArray = [];
  }

  userRequest(){
    interface ApiResponse{
      name:string;
      login:string;
      avatar_url:string;
      followers:number;
      following:number;
      public_repository:number;
      html_url:string;
    }
    
    let promise = new Promise((resolve,reject)=>{
      this.http.get(this.BaseUrl + this.username + this.FinalUrl).toPromise().then(response=>{
        this.user.name = response.json().name;
        this.user.login = response.json().login;
        this.user.avatar_url = response.json().avatar_url;
        this.user.followers = response.json().followers;
        this.user.following = response.json().following;
        this.user.public_repository = response.json().public_repos;
        this.user.html_url = response.json().html_url;
        resolve()
        console.log("one");
        console.log(this.user);
      },
      error=>{
        console.log("Error occured")
        reject(error);
      })
    })
    return Promise;
  }

  repositoryRequest(){
    this.reposArray = [];
    interface ApiResponse{
      name:string;
      html_url:string;
      description:string;
    }
    let promise = new Promise((resolve,reject)=>{
      this.http.get(this.BaseUrl + this.username +"/repos" + this.FinalUrl).toPromise().then(response=> {
        for (let repository of response.json()) {
        this.repos.name = repository.name;
        this.repos.html_url = repository.html_url;
        this.repos.description = repository.description;
        this.repos = new Repository("","","");
        this.reposArray.push(this.repos);
          } 
        resolve()
        console.log("two");
        console.log(response);
      },
      error=>{
        console.log("Error occured");
      })
    });
    return promise;
  }
  updateUser(username:string){
    this.username = username;
  }
}