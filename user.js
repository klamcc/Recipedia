import { Octokit } from "https://esm.sh/@octokit/core";
const gistId = '19ae58d8b99f7056155268d0b4416fd4';


const octokit = new Octokit({
    // auth: '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'
    auth: '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'
})


export async function get() {
    const response = await octokit.request(`GET /gists/${gistId}`, {
        gist_id: gistId,
    })
    console.log(JSON.parse(response.data.files["user-data.json"].content))
    return [(JSON.parse(response.data.files["user-data.json"].content))[localStorage.getItem('login')], (JSON.parse(response.data.files["user-data.json"].content))]


}


export async function update(update) {
    console.log('user data updated')
    octokit.request(`PATCH /gists/${gistId}`, {
        gist_id: gistId,
        files: {
            'user-data.json': {
                content: update
            }
        }
    })
}

export async function signup(email) {
    let data = await get()
    console.log(data)
    data[1][email] = { 'lists': { 'favourites': [] }, 'history': [] }
    console.log(data[1])
    console.log(JSON.stringify(data[1]))
    update(JSON.stringify(data[1]))

    console.log(email)
    console.log('UPDATED')




}

if (localStorage.getItem('login')) {
    let data = await get()
    console.log(data)
    if (data[0]) {  
        if (data[0]['history'].length > 3) {
            console.log('more than 3')
            while (data[0]['history'].length > 3){
                data[0]['history'].pop()
                data[1][localStorage.getItem('login')]['history'].pop()
                console.log('pop')
            }

            update(JSON.stringify(data[1]))
        }

    }
}
