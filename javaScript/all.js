const addBtn = document.getElementById("addBtn");
const inputTxt = document.getElementById("inputTxt");
const todoList = document.getElementById("todoList");

let data = [];

//初始化
function renderData(data){
    let str='';
    data.forEach((item)=>{
        str+=`<li data-id=${item.id}>
        <label class="checkbox" for="">
          <input type="checkbox" ${item.checked}/>
          <span>${item.txt}</span>
        </label>  
        <a href="#" class="delete"></a>
      </li>`
    })
    todoList.innerHTML=str;
}

//新增
addBtn.addEventListener('click',(e)=>{
    let obj={
        txt:inputTxt.value,
        id:new Date().getTime(),
        checked:''

    };
    if(inputTxt.value!=""){
    data.unshift(obj);
    changeState();
    inputTxt.value=""; 
    
    }
    
})

//優化-使用ENTER新增
inputTxt.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        let obj={
            txt:inputTxt.value,
            id:new Date().getTime(),
            checked:''
        };
        if(inputTxt.value!=""){
        data.unshift(obj);
        changeState();
        inputTxt.value=""; 
    }}
})

//刪除、勾選
todoList.addEventListener('click',(e)=>{
    let num = e.target.closest('li').dataset.id;
 if(e.target.getAttribute('class')=="delete"){ 
     e.preventDefault() 
    data = data.filter((item)=>{
        return item.id!=num ;
     })
    
 }else{
     data.forEach((item,index)=>{
        if(item.id == num){
           if(data[index].checked==""){
                data[index].checked="checked"
           }else 
                data[index].checked=""
        }

     })
 }
 changeState();
})



//tab切換
const tab =document.getElementById("tab")
let toggleList = 'all';
tab.addEventListener('click',(e)=>{
    toggleList=e.target.getAttribute("data-tab")
    let tabChange =document.querySelectorAll("#tab li");
    tabChange.forEach((item)=>{
    item.classList.remove('active');
    });
    e.target.classList.add('active');
    changeState()
})

//變更狀態
function changeState(){
    let state=[];
    if(toggleList=="all"){
     state = data;
    }else if(toggleList=="todo"){
        state = data.filter((item)=>{
         return item.checked=="";
    })
    }else {state = data.filter((item)=>{
        return item.checked=="checked"})}
    const total = document.getElementById('total');
    let totalLength = data.filter((item)=>{
        return item.checked==""});
        total.textContent = totalLength.length
        renderData(state);
}

//刪除所有已完成
const delAll = document.getElementById('delAll');
delAll.addEventListener('click',(e)=>{
    e.preventDefault()
    data = data.filter((item)=>{
        return item.checked!="checked";
    })
    changeState();
})
