/**
 * Created by YK on 2017/6/9.
 */
import { Injectable } from '@angular/core';

import { HeroesReal } from './HeroesReal';

@Injectable()
export class heroesMessageService{
    HeroesDetail = [
    new HeroesReal(1,'tom'),
    new HeroesReal(2,'marry'),
    new HeroesReal(3,'curry'),
    new HeroesReal(4,'stone'),
    new HeroesReal(5,'summer'),
    ];
    getHeroesMess(){
      /*return Promise.resolve(this.HeroesDetail);*/
      return new Promise(function(resolve,reject){
        if(this.HeroesDetail){
          resolve(this.HeroesDetail);
        }else{
          reject("出错了");
        }
      })
    }
}
