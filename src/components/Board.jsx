import React, { useState, useEffect } from 'react'
import '../styles/Board.css'
import { getJoke } from '../services/axiosService'
import { Button } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Board = () => {

    const [joke, setJoke] = useState(null)
    const [feed, setFeed] = useState({
        likes: 0,
        dislikes: 0
    })
    const [comented, setComented] = useState([true, 'like'])

    useEffect(() => {
        obtainJoke()
    }, [])

    const obtainJoke = () => {
        if(comented[0]) {
            getJoke()
                .then(response => { 
                    setJoke(response.data.value)
                    console.log(response)
                })
                .catch(error => { alert(`Somethin went wrong: ${error}`)})
                setComented([false, ''])
        } else {
            alert('Please feed back your opinion before get new joke')
        }
    }
    
    const like = () => {
        if(comented[0]) {
            if(comented[1] === 'dislike') {
                setFeed({
                    likes: feed.likes + 1,
                    dislikes: feed.dislikes - 1
                })
                setComented([true, 'like'])
            }
        } else {
            setFeed({
                likes: feed.likes + 1,
                dislikes: feed.dislikes
            })
            setComented([true, 'like'])
        }
    }

    const dislike = () => {
        if(comented[0]) {
            if(comented[1] === 'like') {
                setFeed({
                    likes: feed.likes - 1,
                    dislikes: feed.dislikes + 1
                })
                setComented([true, 'dislike'])
            }
        } else {
            setFeed({
                likes: feed.likes,
                dislikes: feed.dislikes + 1
            })
            setComented([true, 'dislike'])
        }
    }

    return (
        <div className='board'>
            <h1 className='title'>Chuck Norris Jokes:</h1>

            {
                joke != null ?
                (   
                    <div>
                        <p className='joke'>Chuck said:</p>
                        <p className='joke'>{ joke }</p>
                    </div>
                )
                :
                (
                    <p>Loading...</p>
                )
            }
            <div className='btn-joke'>
                <Button
                    variant='contained'
                    onClick={ obtainJoke }
                >
                    New Joke
                </Button>
            </div>
            <div className='btn-joke'>
                <Button onClick={ like } color='success'>
                    <div className='btn-icon'>
                        <ThumbUpIcon fontSize='large' />
                        <span>{ feed.likes }</span>
                    </div>
                </Button>
                <Button onClick={ dislike } color='error'>
                    <div className='btn-icon'>
                        <ThumbDownIcon fontSize='large' />
                        <span>{ feed.dislikes }</span>
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default Board
