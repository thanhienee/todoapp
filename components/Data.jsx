export default function Data(props) {
  return (
    <div className="data--item" key={props.id}>
      <p>userId: {props.userId}</p>
      <p>title: {props.title}</p>
      <p>completed: {props.completed}</p>
    </div>
  );
}
