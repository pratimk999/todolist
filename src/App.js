import "./App.css";
import { Button, TextField } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

function App() {
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);

  const handleToggle = (value) => () => {
    // console.log(allTodos);
    let currentTodo = allTodos[value];
    // console.log(currentTodo);
    currentTodo.isDone = !currentTodo.isDone;
    setAllTodos((prevItems) => {
      // console.log(prevItems);
      return [...prevItems];
    });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 560,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const classes = useStyles();

  const submitTodo = () => {
    setAllTodos((prevItems) => {
      const newItems = [
        ...prevItems,
        {
          todo: todo,
          isDone: false,
        },
      ];
      return newItems;
    });

    setTodo("");
  };

  console.log(todo);
  console.log("All todosss", allTodos);
  return (
    <div className="app">
      <div className="app__center">
        <h4 className="app__header">TODO APP</h4>
        <div className="app__top">
          <TextField
            id="standard-basic"
            label="Enter todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={submitTodo}>
            Add
          </Button>
        </div>
        <div className="app__bottom">
          {allTodos.length === 0 ? (
            <span className="app__span">No todo here</span>
          ) : (
            <List dense className={classes.root} id="app__list">
              {allTodos?.map((item, i) => {
                const labelId = `checkbox-list-secondary-label-${i}`;
                return (
                  <ListItem key={i} button>
                    <ListItemText
                      id={labelId}
                      primary={item.todo}
                      className={item.isDone && "app__strike"}
                    />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(i)}
                        checked={item.isDone}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
