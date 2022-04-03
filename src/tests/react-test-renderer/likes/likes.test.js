import {act, create} from "react-test-renderer"
import likesJson from "./likes.json"
import Likes from "./likes";

test('likes render', () => {
    let likesRender
    act(() => {
        likesRender = create(
            <Likes
                like={likesJson}/>
        )
    })
    const root = likesRender.root
    const ttrDislikes = root.findAllByProps({
        className: 'ttr-like'})
    expect(ttrDislikes.length).toBe(ttrDislikes.length)
    ttrDislikes.forEach((ttrDislike, ndx) => {
        expect(ttrDislike.props.children).toBe(likesJson[ndx].tuit)
    })
})