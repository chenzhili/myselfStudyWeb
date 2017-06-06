/**
 * Created by YK on 2017/6/5.
 */
export class Hero{
  constructor(public id:Number,public name:String){

  }
}
export  class A{
  constructor(public age:any){
    console.log(age);
  }
}

export class DetailHero{
  constructor(
    public id:number,
    public name:string,
    public power:string,
    public alterEgo? :string
  ){}
}
