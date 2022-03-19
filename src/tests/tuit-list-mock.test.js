import axios from "axios";
import {findAllTuits} from "../services/tuits-service";
import {render,screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuits from "../components/tuits";

jest.mock('axios');


const MOCKED_TUITS = [
    {tuit: 'alice_tuit', postedBy: 'alice', _id: "111"},
    {tuit: 'bob s tuit', postedBy: 'bob', _id: "222"},
    {tuit: 'charlie s tuit', postedBy: 'charlie', _id: "333"},
    {tuit: 'shreya s tuit', postedBy: 'spacex', _id: "444"},
];

test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);

    const tuit = screen.getByText(/bob/i);
    expect(tuit).toBeInTheDocument();
});