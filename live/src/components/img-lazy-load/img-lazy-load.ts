import { Component, Input } from '@angular/core';

/**
 * Generated class for the ImgLazyLoadComponent component.
 *
 */
@Component({
  selector: 'img-lazy-load',
  templateUrl: 'img-lazy-load.html'
})
export class ImgLazyLoadComponent {

  default:any = 'assets/image/load/load_img.gif';
  @Input() src: any //要显示的图片
  constructor() {
  }

  ngOnChanges(changes) {
    let src =  changes.src.currentValue
    changes.src.currentValue!=undefined&&this.judegeIsImg(src)==true?this.default=src:'';
  }

  //判断是否是图片
  judegeIsImg(str:string){
    if(str.match('base64'))return true
    else{
      var s = str.lastIndexOf('.');
      str= str.slice(s).toUpperCase();
      if(str!=".BMP"&&str!=".PNG"&&str!=".GIF"&&str!=".JPG"&&str!=".JPEG"){
        return false;
      }else return true;
    }
  }

}
