import { Octokit } from "https://esm.sh/@octokit/core";
const gistId = '19ae58d8b99f7056155268d0b4416fd4';


const octokit = new Octokit({
    auth: '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'
})


export async function get() {
    const response = await octokit.request(`GET /gists/${gistId}`, {
        gist_id: gistId,
    })
    return (JSON.parse(response.data.files["user-data.json"].content))
}


async function update(update) {
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

export async  function signup(email) {
    let data = await get()
    data[email] = {'lists':{'favourites':[]},'history':[]}
    update(JSON.stringify(data))


}


