import {
    createTuit,
    deleteTuitsByUsername, findAllTuits,
    findTuitById
} from "../services/tuits-service";

/**
 * @jest-environment node
 */
describe('can create tuit with REST API', () => {
    // sample tuit to insert
    const tuitByNasa = {
        tuit: 'Good morning world!',
        postedBy: 'nasa'
    };
    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteTuitsByUsername(tuitByNasa.postedBy);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteTuitsByUsername(tuitByNasa.postedBy);
    })

    test('can insert new tuits with REST API', async () => {
        // insert new user in the database
        const newTuit = await createTuit(tuitByNasa);

        // verify inserted user's properties match parameter user
        expect(newTuit.tuit).toEqual(tuitByNasa.tuit);
        expect(newTuit.postedBy).toEqual(tuitByNasa.postedBy)
    });
});

describe('can delete tuit with REST API', () => {

    // sample tuit to delete
    const tuitBySpaceX = {
        tuit: 'Good morning world!',
        postedBy: 'spacex'
    };
    // setup the tests before verification
    beforeAll(() => {
        // insert the sample user we then try to remove
         return createTuit(tuitBySpaceX);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteTuitsByUsername(tuitBySpaceX.postedBy);
    })

    test('can delete tuits from REST API by username', async () => {
        // delete a tuit by the user who posted it. Assumes user already exists
        const status = await deleteTuitsByUsername(tuitBySpaceX.postedBy);

        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // sample user we want to retrieve
    const tuitByAdam = {
        tuit: 'Hello, I am Adam.!',
        postedBy: 'adam'
    };
    // setup before running test
    beforeAll(() => {
        // clean up before the test making sure the user doesn't already exist
        return deleteTuitsByUsername(tuitByAdam.postedBy)
    });

    // clean up after ourselves
    afterAll(() => {
        // remove any data we inserted
        return deleteTuitsByUsername(tuitByAdam.postedBy);
    });

    test('can retrieve user from REST API by primary key', async () => {
        // insert the user in the database
        const newTuit = await createTuit(tuitByAdam);

        // verify new tuit matches the parameter tuit
        expect(newTuit.tuit).toEqual(tuitByAdam.tuit);
        expect(newTuit.postedBy).toEqual(tuitByAdam.postedBy);

        // retrieve the tuit from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // verify retrieved tuit matches parameter tuit
        expect(existingTuit.tuit).toEqual(tuitByAdam.tuit);
        expect(existingTuit.postedBy).toEqual(tuitByAdam.postedBy);
    });

});

describe('can retrieve all tuits with REST API',  () => {

    // sample tuits we'll insert to then retrieve
    const tuits = [
        "spacex", "nasa-logo", "spacex"
    ];


    // setup data before test
    beforeAll(() =>
        // insert several known users
        tuits.map(individualTuit =>
            createTuit({
                tuit: `${individualTuit} is the best.`,
                postedBy: `${individualTuit}`
            })
        )
    );

    // clean up after ourselves
    afterAll(() =>
        // delete the users we inserted
        tuits.map(individualTuit =>
            deleteTuitsByUsername(individualTuit.postedBy)
        )
    );

    test('can retrieve all tuits from REST API', async () => {
        // retrieve all the tuits
        const tuitsFetched = await findAllTuits();

        // there should be a minimum number of tuits
        expect(tuitsFetched.length).toBeGreaterThanOrEqual(tuitsFetched.length);

        // let's check each tuit we inserted
        const tuitsWeInserted = tuitsFetched.filter(
            tuit => tuits.indexOf(tuit.postedBy) >= 0);

        // compare the actual tuits in database with the ones we sent
        tuitsWeInserted.forEach(tuit => {
            const tuitsFromDb = tuits.find(tuitsFromDb => tuitsFromDb === tuit.postedBy);
            expect(tuit.postedBy).toEqual(tuitsFromDb);
            expect(tuit.tuit).toEqual(`${tuitsFromDb} is the best.`);
        });
    });
});
