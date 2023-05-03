function bar() {
    

    const todoname = document.getElementById('name').value;
    const discription = document.getElementById('discript').value;
    let flag = false;

    
    myobj = {
        todoname,
        discription,
        flag
    };
    

    axios
        .post('https://crudcrud.com/api/c9418faafdf8417c936292d3ff151add/db', myobj)
        .then(res => {


            let newdiv = document.createElement('div');
            let newli = document.createElement('li');
            let checkbox_btn = document.createElement('input');
            let cross_btn = document.createElement('button');

            checkbox_btn.type = 'checkbox';
            checkbox_btn.addEventListener('change', ll);
            cross_btn.onclick = ss;
            cross_btn.type = 'submit';
            cross_btn.innerText = 'X';
            cross_btn.setAttribute('data-id', res.data._id);

            newli.textContent = `Task Name = ${res.data.todoname} and Task discription is  ${res.data.discription} `;

            newli.appendChild(checkbox_btn);
            newli.appendChild(cross_btn);
            newdiv.appendChild(newli);
            let tasks=document.getElementById('tasks')

            tasks.appendChild(newdiv)
        })
        .catch(err => {
            console.log(err);
        });
    
}

function ss(e) {
    e.preventDefault();
    let id = e.target.getAttribute('data-id');
    axios
        .delete(`https://crudcrud.com/api/c9418faafdf8417c936292d3ff151add/db/${id}`)
        .then(res => {
            console.log('item deleted');
            let item = e.target.parentElement;
            item.remove();
        });
}


function ll(e) {
    e.preventDefault();
    const itemid = e.target.closest('div').querySelector('button').getAttribute('data-id');
    console.log(itemid);

    

    axios.get(`https://crudcrud.com/api/c9418faafdf8417c936292d3ff151add/db/${itemid}`)
        .then((response) => {
            
            axios
                .put(`https://crudcrud.com/api/c9418faafdf8417c936292d3ff151add/db/${itemid}`, {
                    todoname: response.data.todoname,
                    discription: response.data.discription,
                    flag: true
                })
                .then(res => {
                    

                    let newdiv = document.createElement('div');
                    let newli = document.createElement('li');

                    newli.textContent = `task-done=${response.data.todoname} and discription is ${response.data.discription}`;

                    let taskdone = document.getElementById('taskdone');
                    newdiv.appendChild(newli);
                    taskdone.appendChild(newdiv);

                    let item = e.target.parentElement;
                    item.remove();
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });

}


window.addEventListener('DOMContentLoaded', () => {
    axios
        .get('https://crudcrud.com/api/c9418faafdf8417c936292d3ff151add/db')
        .then(response => {
            
            for (let i = 0; i < response.data.length; i++) {
                if(response.data[i].flag===false)
                {
                    let newdiv = document.createElement('div');
                    let newli = document.createElement('li');
                    let checkbox_btn = document.createElement('input');
                    let cross_btn = document.createElement('button');

                    checkbox_btn.type = 'checkbox';
                    checkbox_btn.addEventListener('change', ll);
                    cross_btn.onclick = ss;
                    cross_btn.type = 'submit';
                    cross_btn.innerText = 'X';
                    cross_btn.setAttribute('data-id',response.data[i]._id)
                    newli.textContent = `Task Name = ${response.data[i].todoname} and Task discription is  ${response.data[i].discription} `;

                    newli.appendChild(cross_btn);
                    newli.appendChild(checkbox_btn);
                    newdiv.appendChild(newli);

                    let tasks=document.getElementById('tasks')

                    tasks.appendChild(newdiv)

                }
                else{
                    
                    let newdiv = document.createElement('div');
                    let newli = document.createElement('li');

                    newli.textContent=`task-done=${response.data[i].todoname} and discription is ${response.data[i].discription}`

                    let taskdone=document.getElementById('taskdone')
                    newdiv.appendChild(newli)
                    taskdone.appendChild(newdiv)






                }
                

                

            }
        })})



