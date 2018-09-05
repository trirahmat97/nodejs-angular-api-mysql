const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname+'/angular'));

app.use(bodyParser.json()); //mengambil data dalam bentk json
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejs'
});

mysqlConnection.connect((err) => {
  if(!err){
    console.log('database connect');
  }else{
    console.log('database not connect');
  }
});

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`running on port ${port}`));

app.get('/api/mahasiswa', (req, res)=>{
  mysqlConnection.query('SELECT * FROM mahasiswa', (err, mahasiswa)=>{
    if(!err)
      res.send(mahasiswa);
    else
      console.log(mahasiswa);
  });
});

app.get('/api/mahasiswa/detail/:id', (req,res) => {
  mysqlConnection.query('SELECT * FROM mahasiswa where npm = ?', [req.params.id], (err, mahasiswa) => {
    if(!err)
    res.send(mahasiswa);
    else {
      res.send('data mahasiswa tidak di temunakan');
    }
  });
});


app.post('/api/mahasiswa/add', (req, res) => {
  const post = {
    npm : req.body.npm,
    nama : req.body.nama,
    alamat : req.body.alamat
  }
  mysqlConnection.query('INSERT INTO mahasiswa SET ?',post, (err, mahasiswa) => {
    if(!err)
      res.send('data mahasiswa telah berhasil diinputkan');
    else
      res.send('data tidak dapat diinpurkan');
  });
});

app.put('/api/mahasiswa/edit/:id', (req, res) => {
  mysqlConnection.query('update mahasiswa set  nama = ?, alamat = ? where npm = ?', [req.body.data[0].nama, req.body.data[0].alamat, req.params.id], (err, mahasiswa) => {
    if(!err)
    res.send('berhasil update');
    else
    res.send('tidak berhasil update');
  });
});

app.delete('/api/mahasiswa/delet/:id',(req, res) => {
  mysqlConnection.query('delete from mahasiswa where npm = ?', [req.params.id], (err, mahasiswa) => {
    if(!err)
      res.send('berhasil delete');
    else
      res.send('tidak terdelet');
  });
});
