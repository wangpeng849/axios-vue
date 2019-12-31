<template>
    <div class="home">
        <!-- 联系人列表 -->
        <!-- <van-popup v-model="showList" position="bottom"> -->
        <van-contact-list
            v-model="chosenContactId"
            :list="list"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
        />
        <!-- </van-popup> -->
          <!-- 联系人编辑 -->
        <van-popup v-model="showEdit" position="bottom">
        <van-contact-edit
            :contact-info="editingContact"
            :is-edit="isEdit"
            @save="onSave"
            @delete="onDelete"
        />
       </van-popup>
    </div>
</template>

<script>
// import {Button} from 'vant'
import Vue from 'vue'
import {ContactList,ContactEdit,Toast} from 'vant'
import {Popup} from 'vant'
import axios from 'axios'

Vue
    .use(ContactList)
    .use(Popup)
    .use(Toast)
    .use(ContactEdit)

export default {
  name: 'contactList',
  compoents: {
    //   [ContactList.name]:ContactList
    // [Popup.name]:Popup
  },
  computed : {
      currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    }
  },
  data () {
      return {
        //     {
        //       id:1,
        //       name:'',
        //       tel:''
        //   }
          chosenContactId: null,
          list : [] , 
          instance : null,  //axios实例
          showEdit : false, //编辑弹窗的显隐
          editingContact : {},//正在编辑的联系人
          isEdit : false, //新建或编辑
          showList: true,
      }
  },
  created ()  {
      this.instance = axios.create({
          baseURL: "http://localhost:9000/api",
          timeout: 1000,
      })
     this.getList()
  },
  methods : {
      //获取联系人列表
      getList () {
        this.instance.get('/contactList')
        .then(res => {
            this.list = res.data.data
        }).catch(() => {
            Toast('请求失败，请稍后再试')
        })
      },
      onAdd () {
        this.showEdit = true
        this.isEdit = false
      },
      onEdit (info) {
        this.showEdit = true
        this.isEdit = true
        this.editingContact = info
      },
      onSelect () {
        this.showList = false;
      },
      onSave (info) {

        if(this.isEdit){
            //编辑保存
            this.editingContact = info
            this.instance.put('/contact/edit',info).then(res => {
                 if(res.data.code === 200){
                     Toast("编辑成功")
                    this.showEdit = false
                    this.getList()
                 }
            }).catch(()=>{
                Toast("请求失败! ")
            })
        }else{
            //新建保存
            this.instance.post('/contact/new/json',info)
            .then(res => {
                if(res.data.code === 200){
                    Toast("新建成功！")
                    this.showEdit = false
                    this.getList()
                }
            }).catch(()=>{
                Toast("新建失败! ")
            })
        }
      },
      onDelete (info) {
           this.instance.delete('/contact',{
               params : {
                   id : info.id
               }
           }).then(res => {
               if(res.data.code === 200){
                   Toast("删除成功！")
                     this.showEdit = false
                    this.getList()
               }
           }).catch(()=>{
                Toast("请求失败")
           })
      }
  }
 
}
</script>
