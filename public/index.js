const loginFormDOM = document.querySelector('#login-form')
const messageDOM = document.querySelector('#message')

loginFormDOM.addEventListener('submit', async (e) => {
    try {
        e.preventDefault()
        const usernameDOM = loginFormDOM.querySelector('#username')
        const passwordDOM = loginFormDOM.querySelector('#password')
        const formData = {
            username: usernameDOM.value,
            password: passwordDOM.value
        }
        const { data } = await axios.post('/user', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        window.location.href = `/dashboard.html?id=${data.id}`
    } catch (error) {
        messageDOM.innerHTML = error.response.data.msg
    }
    return false
})