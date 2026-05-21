export const getUsers = async() =>{
    const res = await fetch('http://localhost:5000/users');
    const data = await res.json();
    return data;
}