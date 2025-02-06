

const NotFound:React.FC = () => {

    fetch('https://36d7-194-93-25-25.ngrok-free.app/api/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));
    fetch('http://localhost:7777/api/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));
    return (
        <div>404 qweqwe</div>
    )
}

export default NotFound