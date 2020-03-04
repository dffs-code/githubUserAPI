function verifyUsername(){
    var inputElement = window.document.getElementById("username")
    
    if(inputElement.value.length < 1){
        alert("Insert some user to verify")
        return
    }
    else
    {
    axios.get('https://api.github.com/users/' + inputElement.value)
        .then(function(response){
            console.log(response)
            var verifiedUser = response.data;

            /* DATA RESPONSE
            login                       type
            id                          site_admin
            node_id                     name
            avatar_url                  company
            gravatar_id                 blog
            url                         location
            html_url                    email
            followers_url               hireable
            following_url               bio
            gists_url                   public_repos
            starred_url                 public_gists
            subscriptions_url           followers
            organizations_url           following
            repos_url                   created_at
            events_url                  updated_at
            received_events_url
            */
                
            //incluidng elements on html
            var div = document.getElementById("lista")
            div.appendChild(document.createTextNode("Click on the user info to access his page"))
            var btn = document.createElement("button")
            btn.setAttribute("class", "devs")
            btn.setAttribute("id", verifiedUser.login)
            btn.setAttribute("onclick", "deleteUsers(id)")

            div.appendChild(btn)

            //including childs
            var avatar = document.createElement('img')
            avatar.setAttribute("src", verifiedUser.avatar_url)

            var login = document.createElement("b")
            login.appendChild(document.createTextNode(verifiedUser.login))

            btn.appendChild(document.createElement("br"))
            btn.appendChild(avatar)//avatar
            btn.appendChild(document.createElement("br"))

            btn.appendChild(login)//username
            btn.appendChild(document.createElement("br"))

            btn.appendChild(document.createTextNode(verifiedUser.name))//name
            btn.appendChild(document.createElement("br"))

            //verify user bio
            if(verifiedUser.bio)btn.appendChild(document.createTextNode('" ' + verifiedUser.bio + ' "'))//bio
            else btn.appendChild(document.createTextNode('Unavailable biography'))
            
            btn.appendChild(document.createElement("br"))
            btn.appendChild(document.createTextNode("Public Repositories: " + verifiedUser.public_repos))//public repos
            btn.appendChild(document.createElement("br"))
            
            inputElement.value = ''
        })
        .catch(function(reject){
            alert("User "+ inputElement.value + " not found.Please, try again.")
            
            inputElement.value = ''
        });
    }
}
function deleteUsers(id){
    var btn = document.getElementById(id)

    window.open("https://github.com/"+id, '_blank')
}