import "./Favorites.css";
import { useDispatch, useSelector } from "react-redux";
import { addToMyList, removeAllFromCart, removeFromCart, removeListItem } from "../../redux/actions/cartActions";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {

    const [state, setState] = useState({
        listName:''
    })

  const { data,list } = useSelector((state) => state.cart);
  const states = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleRemoveData = (id) => {
    dispatch(removeFromCart(id));
  };
    
    const handleChange = (e) => {
     setState({...state,listName:e.target.value})
 }
    
  const handleClick = () => {
      let listItem = {
          listName:state.listName,
          data,
      }
      dispatch(addToMyList(listItem))
      setState({
          listName:""
      })
      dispatch(removeAllFromCart())
    } 
    
    const handleDeleteList = (id) => {
        dispatch(removeListItem(id))
    };

  return (
    <div className="favorites">
          <input value={state.listName } className="favorites__name" onChange={handleChange} />
      <ul className="favorites__list">
        {data?.map((item) => {
          return (
            <li key={item.imdbID}>
              {item.Title} ({item.Year})
              <button onClick={() => handleRemoveData(item.imdbID)}>
                remove
              </button>
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={handleClick} disabled={state.listName?false:true} className="favorites__save">
        Сохранить список
          </button>
          
          {
              list?.map(item => {
                  return ( <React.Fragment key={item.listName}>
                    <div className="fav-list">
                      <div className="fav-list-item">
                      <Link
                        to={`/list/${item.listName}`}
                        key={item.listName}
                        href=""
                        >
                        {item.listName}
                      </Link>
                      <button onClick={() => handleDeleteList(item.listName)}>
                        delete
                      </button>
                          </div>
                        </div>
                    </React.Fragment>
                  );
              })
          }
    </div>
  );
};

export default Favorites;
