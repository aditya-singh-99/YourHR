const resumeDOM = document.querySelector('#resume')
const previewDOM = document.querySelector('embed')
const resumeFormDOM = document.querySelector('#resume-form')
const welcomeTextDOM = document.querySelector('.welcome-text')
const userIDDom = document.querySelector('.user-id')
const messageDOM = document.querySelector('#message')

const params = window.location.search
const id = new URLSearchParams(params).get('id')

window.onload = async (e) => {
    try {
        const { data } = await axios.get(`/user?id=${id}`)
        const { username } = data
        welcomeTextDOM.innerHTML = `Hello, ${username}`
        userIDDom.innerHTML = `UserID: ${id}`
        fetchAndDisplayResume(id)
    } catch (error) {
        console.log(error)
    }
}

const updatePreview = (url) => {
    previewDOM.setAttribute('src', url);
}

const fetchAndDisplayResume = async (userId) => {
    try {
        const response = await axios.get(`/resume?id=${userId}`, {
            responseType: 'arraybuffer'
        });
        const blob = new Blob([response.data], { type: 'application/pdf' })
        const fileURL = URL.createObjectURL(blob)
        updatePreview(fileURL)
        messageDOM.innerHTML = "Resume loaded Successfully"
    } catch (error) {
        messageDOM.innerHTML = error.response.data.msg
    }
}

resumeDOM.addEventListener('change', () => {
    const file = resumeDOM.files[0]
    const fileURL = URL.createObjectURL(file)
    updatePreview(fileURL)
})

resumeFormDOM.addEventListener('submit', async (e) => {
    try {
        e.preventDefault()
        if (resumeDOM.files.length === 0) {
            alert('Please select a PDF file to upload.');
            return;
        }
        const file = resumeDOM.files[0];
        const maxSizeInBytes = 2 * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            alert('The file size exceeds the 2MB limit. Please upload a smaller file')
            return
        }
        var formData = new FormData()
        formData.append('file', file)
        const { data } = await axios.post(`/resume?id=${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        fetchAndDisplayResume(id)
    } catch (error) {
        messageDOM.innerHTML = error.response.data.msg
    }
})