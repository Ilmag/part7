import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title & author only', () => {
    const blog = {
        title: 'For testing.',
        author: 'Me',
        url: 'http:\\someurl',
        likes: 1000
    }

    render(< Blog blog = { blog } />)

    const title = screen.getByText('For testing.')
    expect(title).toBeDefined
    const author = screen.getByText('Me')
    expect(author).toBeDefined
    const url = screen.getByText('http:\\someurl')
    expect(url).not.toBeVisible
    const likes = screen.getAllByText('likes: 1000')
    expect(likes).not.toBeVisible
})

test('url and likes are shown when "view" button is clicked', () => {
    const blog = {
        title: 'For testing.',
        author: 'Me',
        url: 'http:\\someurl',
        likes: 1000
    }

    const { container } = render(<Blog blog={blog}/>)

    const button = container.querySelector('#show-button')

    fireEvent.click(button)
    
    const div = container.querySelector('#url-likes')
    expect(div).not.toHaveStyle("display:none")
})