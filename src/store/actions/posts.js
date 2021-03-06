import {
    POST_CREATED, CREATING_POST, SET_POSTS
} from './actionTypes'
import { setMessage } from './message'
import axios from 'axios'

export const addPost = post => {
    return (dispatch, getState) => {
       dispatch(creatingPost())
       axios({
           url: 'uploadImage',
           baseURL: 'https://us-central1-lambe-7ef95.cloudfunctions.net/uploadImage',
           method: 'post',
           data: {
               image: post.image.base64
           }
        })
        .catch(err => {
            dispatch(setMessage({
                title: 'Erro',
                text: 'Ops!!!Algo Aconteceu...'
            }))
        })
        .then(resp => {
            post.image = resp.data.imageUrl
            axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
                .catch(err => {
                    dispatch(setMessage({
                        title: 'Erro',
                        text: err
                    }))
                })
                .then(res => {
                    dispatch(fetchPosts()) 
                    dispatch(postCreated())                       
            })
        })
    }  
}

export const addComment = payload => {
    return (dispatch,getState)=> {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ops!!!Algo Aconteceu...'
                }))
            })
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)
                //?auth=${getState().user.token}`, { ...post })
                axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`,{comments})
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Erro',
                            text: 'Ops!!!Algo Aconteceu...'
                        }))
                    })
                    .then(res => {
                        dispatch(fetchPosts())
                    })
            })
    }
    
}

export const addLike = payload => {
    return (dispatch,getState)=> {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ops!!!Algo Aconteceu...'
                }))
            })
            .then(res => {
                const likes = res.data.likes || []
                likes.push(payload.like)
                //?auth=${getState().user.token}`, { ...post })
                axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`,{likes})
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Erro',
                            text: 'Ops!!!Algo Aconteceu...'
                        }))
                    })
                    .then(res => {
                        dispatch(fetchPosts())
                    })
            })
    }
    
}

export const setPosts = posts => {
    return{
        type: SET_POSTS,
        payload: posts
    }
}

export const fetchPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ops!!!Algo Aconteceu...'
                }))
            })
            .then(res => {
                const rawPosts = res.data
                const posts = []
                for(let key in rawPosts){
                    posts.push({
                        ...rawPosts[key],
                        id: key
                    })
                }
                dispatch(setPosts(posts.reverse()))
            })
    }

}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}

