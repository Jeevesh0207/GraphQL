import './App.css';
import { useQuery, gql } from '@apollo/client';

const query = gql`
  query GetTodos{
    getTodos{
      title
      completed
      user{
        name
        email
        phone
      }
    }
  }
`

function App() {
  const { data, loading } = useQuery(query);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <h1>Todo List</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Completed</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {
          data.getTodos.map(todo => (
            <tr key={todo.title}>
              <td>{todo.title}</td>
              <td>{todo?.completed ? 'Yes' : 'No'}</td>
              <td>{todo?.user?.name}</td>
              <td>{todo?.user?.email}</td>
              <td>{todo?.user?.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
