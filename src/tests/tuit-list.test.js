import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";

const MOCKED_TUITS = [
    {_id: "111", tuit: "Alice tuits", postedBy: "Alice"},
    {_id: "222",tuit: "Bob tuits", postedBy: "Bob"},
    {_id: "333",tuit: "Charlie tuits", postedBy: "Charlie"}
];

test('tuit list renders static tuit array', () => {
    render(
        <HashRouter>
            <Tuits tuits = {MOCKED_TUITS}/>
        </HashRouter>);
    const linkElement = screen.getByText(/Alice tuits/i);
    expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/NASA/i);
    expect(linkElement).toBeInTheDocument();
})
