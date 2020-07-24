const request = async (url, method, data)=>{
            let options = {
                method:method,
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            if(data && method.toLowerCase() !== 'get') {
                options.body = JSON.stringify(data)
            }

            let response = await fetch(url, options);
            return response.json();
        };

        const start = async ()=>{
            let tasks = await request("/tasks", 'GET');
            document.getElementById("tasks").innerHTML = 
            tasks.map(task=>`
                <div id='${task.id}'> 
                    ${task.title} 
                    <input type="checkbox" ${task.is_completed ? 'checked': ""} class="completed">
                    <button class="delete" id="delete_${task.id}">Delete</button> 
                </div>
            `).sort((a,b)=>a.id-b.id).join("");
            
            document.querySelectorAll(".completed").forEach(box=>{
                box.addEventListener('change', async (evt)=>{
                    let result = await request(`/edit-task/${evt.target.parentNode.id}/complete_task`, 'PATCH')
                    console.log(result);
                })
            })
            
        }

        start();
