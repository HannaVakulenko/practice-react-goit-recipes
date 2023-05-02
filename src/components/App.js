import { useState, useEffect } from 'react';
import { RecipeList } from './RecipeList/RecipeList';
import initialRecipes from '../recipes.json';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { RecipeForm } from './RecipeForm/RecipeForm';

// render > didMount > getItem > setState > update > render > didUpdate > setItem

//функція ініціалізатор - патерн для LS
const getInitialRecipes = () => {
  const savedRecipes = localStorage.getItem('recipes');
  if (savedRecipes !== null) {
    return JSON.parse(savedRecipes);
  } else {
    return initialRecipes;
  }
};

export const App = () => {
  const [recipes, setRecipes] = useState(getInitialRecipes);

  useEffect(() => {
    //did mount/update LS write effect
    localStorage.setItem('recipes', JSON.stringify(recipes));
  });

  const addRecipe = newRecipe => {
    setRecipes(prevState => [...prevState, newRecipe]);
  };

  const deleteRecipe = recipeId => {
    setRecipes(prevState => prevState.filter(recipe => recipe.id !== recipeId));
  };

  return (
    <Layout>
      <RecipeForm onSave={addRecipe} />
      <RecipeList items={recipes} onDelete={deleteRecipe} />
      <GlobalStyle />
    </Layout>
  );
};

// export class App extends Component {
//   state = {
//     recipes: [],
//   };

//   componentDidMount() {
//     const savedRecipes = localStorage.getItem('recipes');
//     if (savedRecipes !== null) {
//       // Если сохранили в LS уже что-то, пишем ЭТО в state
//       this.setState({ recipes: JSON.parse(savedRecipes) });
//     } else {
//       // Если в LS ничего еще нет, пишем в state initialRecipes
//       this.setState({ recipes: initialRecipes });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.recipes !== this.state.recipes) {
//       localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
//     }
//   }

//   addRecipe = newRecipe => {
//     this.setState(prevState => ({
//       recipes: [...prevState.recipes, newRecipe],
//     }));
//   };

//   deleteRecipe = recipeId => {
//     this.setState(prevState => ({
//       recipes: prevState.recipes.filter(recipe => recipe.id !== recipeId),
//     }));
//   };

//   render() {
//     console.log('render');
//     return (
//       <Layout>
//         <RecipeForm onSave={this.addRecipe} />
//         <RecipeList items={this.state.recipes} onDelete={this.deleteRecipe} />
//         <GlobalStyle />
//       </Layout>
//     );
//   }
// }
