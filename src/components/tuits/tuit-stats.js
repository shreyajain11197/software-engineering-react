import React, {useState} from "react";
import {findAllTuitsLikedByUser} from "../../services/likes-service";
import {findAllTuitsDislikedByUser} from "../../services/dislikes-service";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}}) => {
    const [checkIfTuitLiked, setCheckIfTuitLiked] = useState(false);
    const [checkIfTuitIsDisliked, setCheckIfTuitIsDisliked] = useState(false);
    findAllTuitsLikedByUser("me").then(response => setCheckIfTuitLiked(
        (response.filter(tuitFetchedFromDb => tuitFetchedFromDb._id === tuit._id)).length > 0));
    findAllTuitsDislikedByUser("me").then(response => setCheckIfTuitIsDisliked(
        (response.filter(tuitFetchedFromDb => tuitFetchedFromDb._id === tuit._id)).length > 0));
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats && tuit.stats.retuits}
        </div>
        <div className="col">
          <span onClick={() => likeTuit(tuit)}>
              {
                  checkIfTuitLiked === true &&
                  <i className="fas fa-thumbs-up" style={{color: 'red'}}></i>
              }
              {
                  checkIfTuitLiked === false &&
                  <i className="far fa-thumbs-up"></i>
              }
            {tuit.stats && tuit.stats.likes}
          </span>
        </div>
        <div className="col">
          <span onClick={() => dislikeTuit(tuit)}>
              {
                  checkIfTuitIsDisliked === true &&
                  <i className="fas fa-thumbs-down me-1" style={{color: 'red'}}></i>
              }
              {
                  checkIfTuitIsDisliked === false &&
                  <i className="far fa-thumbs-down me-1"></i>
              }
              {tuit.stats && tuit.stats.dislikes}
          </span>
        </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;