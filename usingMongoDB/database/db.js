import pkg from 'pg'
const {Pool}=pkg
const pool=new Pool({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"2915",
    database:"elasticsearch"//name of database
})

export default pool