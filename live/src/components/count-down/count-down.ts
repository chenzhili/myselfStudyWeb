import { Component, Input, OnDestroy } from '@angular/core';
import { RepeatProvider } from '../../providers/repeat/repeat';
/**
 * Generated class for the CountDownComponent component.
 */
@Component({
  selector: 'count-down',
  templateUrl: 'count-down.html'
})
export class CountDownComponent implements OnDestroy {
  @Input() Timer: any //要加载的数据
  data: any;
  time: any;
  index: any;
  fnCallBack: any;
  type: any;
  sname: any;
  constructor(private goP: RepeatProvider) {
  }
  //获取倒计时
  getdata(fnCallBack, type, sname) {
    let payload = {
      type: type
    };
    this.goP.yikeData('api/Lottery/newNO/', payload).then(data => {
      let datax = data.json().data;
      //this.data = datax;
      this.fnCallBack = fnCallBack;
      this.type = type;
      this.sname = sname;
      this.judgeGet(datax);
    }).catch(err => {
      this.goP.presentToast('连接服务器失败');
      clearInterval(this.time);
    })
  }

  //判断是否应该请求数据
  judgeGet(datax) {
    this.goP.storageGet(this.sname).then(value => {
      if (value != undefined) {
        if (datax.lottery == value.lottery && datax.nowAction != value.nowAction) {
          this.data = value;
          this.data.list = this.data.lottery.split(',');
          this.data.countDown = '.';
          this.timeDown(0);
          return false;
        } else {
          this.data = datax;
          this.data.list = this.data.lottery.split(',');
          datax.nowAction != value.nowAction ? this.fnCallBack() : "";
          let payload = {
            name: this.sname,
            data: this.data
          }
          this.goP.storageCache(payload);
          this.timeDown(this.data.countdown);
        }
      }
      else {
        this.data = datax;
        this.data.list = this.data.lottery.split(',');
        let payload = {
          name: this.sname,
          data: this.data
        }
        this.goP.storageCache(payload);
        this.timeDown(this.data.countdown);
      }
    });
  }

  //时间倒计时
  timeDown(timer: any) {
    clearInterval(this.time);
    this.time = setInterval(() => {
      if (timer > 0) {
        this.index == 2 ? '' : this.index = 1;
        this.data.countDown = this.goP.TimeFormat(timer);
        timer--;
      } else {
        this.index == 1 ? this.data.countDown = "." : '';
        this.index = 2;
        this.operatTime();
      }
    }, 1000);
  }

  //操作函数
  operatTime() {
    let str = this.data.countDown || '.';
    this.time != undefined ? '' : this.time = null;
    if (str.length > 5) {
      this.data.countDown = '.';
      this.getdata(this.fnCallBack, this.type, this.sname);
    } else {
      this.data.countDown = str + '.';
    }
  }
  ngOnChanges(changes) {
    let data = changes.Timer.currentValue;
    data != undefined ? this.getdata(data.fn, data.type, data.sname) : '';
  }
  ngOnDestroy() {
    clearInterval(this.time);
    this.index = "";
    this.fnCallBack = "";
    this.data = "";
  }
}
