import {Tuit} from "../components/tuits/tuit";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
    {tuit: 'alice s tuit', postedBy: 'alice', _id: "111"},
    {tuit: 'bob s tuit', postedBy: 'bob', _id: "222"},
    {tuit: 'charlie s tuit', postedBy: 'charlie', _id: "333"},
    {tuit: 'shreya s tuit', postedBy: 'shreya', _id: "444"},
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuit tuit = {MOCKED_TUITS}/>
      </HashRouter>);
    const linkElement = screen.getByText(/shreya/i);
    expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  // TODO: implement this
})

test('tuit list renders mocked', async () => {
  // TODO: implement this
});
