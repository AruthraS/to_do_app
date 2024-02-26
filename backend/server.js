const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const app = express();
const port = 8000;
const salt = 10;
const nodemailer = require('nodemailer');
var key;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));
app.use(cookieParser());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Arukav@58",
    database: "todo"
});

const transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'aruthras06@gmail.com',
        pass: 'wbmx zwzx cyti zizi',
    },
});

app.get("/:credential", (req, res) => {
    const query = 'select * from contents where username = ?';
    con.query(query, [req.params.credential], (err, data) => {
        if (err) res.send(err);
        return res.send(data);
    })
});

app.get('/updat/:sno/:credential', (req, res) => {
    const query = "select * from contents where sno= ? and username=?";
    con.query(query, [req.params.sno, req.params.credential], (err, data) => {
        if (err) res.send(err);
        return res.send(data);
    })
});

app.delete('/delete/:sno', (req, res) => {
    const query = 'delete from contents where sno= ?';
    con.query(query, [req.params.sno], (err, data) => {
        if (err) res.send(err);
        return res.send(data);
    })
});

app.put('/status', (req, res) => {
    const query = "update contents set status=? where sno= ?";
    con.query(query, [req.body.arg, req.body.sno], (err, data) => {
        if (err) res.send(err);
        return res.send(data);
    })
});

app.put("/change", (req, res) => {
    const query = "update user set password=? where username=?";
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) { res.send(err); console.log(err); }
        con.query(query, [hash,req.body.credential], (err, data) => {
            console.log(data);
            if (err) { res.send(err); console.log(err); }
            return res.send(data);
        })
    })
});

app.put('/update', (req, res) => {
    const query = "update contents set content = ? , dd = ? , dt = ? where sno= ?";
    const values = [
        req.body.task,
        req.body.date,
        req.body.time,
        req.body.sno
    ];
    con.query(query, values, (err, data) => {
        if (err) res.send(err);
        return res.send(data);
    });
});

app.post("/add/", (req, res) => {
    const query = 'INSERT INTO contents (`content`, `dd`, `dt`, `username`) VALUES(?, ?, ?, ?)';
    const values = [
        req.body.task,
        req.body.date,
        req.body.time,
        req.body.credential
    ];
    con.query(query, values, (err, data) => {
        if (err) { res.send(err); console.log(err); }
        return res.send(data);
    });
});

app.post('/user', (req, res) => {
    const query = "Insert into user values (?,?,?)";
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) { res.send(err); console.log(err); }
        con.query(query, [req.body.username, req.body.email, hash], (err, data) => {
            if (err) { res.send(err); console.log(err); }
            return res.send(data);
        })
    })
});

app.post('/forgot', (req, res) => {
  const id = req.body.email;
  var npass = "";
  for (var i = 0; i < 8; i++) {
    npass += String.fromCharCode(Math.floor(Math.random() * 96 + 32));
  }

  const query = `UPDATE user SET password=? WHERE email=?`;
  bcrypt.hash(npass, salt, (err, hash) => {
    if (err) {console.log(1); return res.status(500).json('failed');}

    con.query(query, [hash, id], (err, data) => {
      if (err) {
        console.log(2);
        return res.status(500).json('failed');
      }

      const mailOptions = {
        from: 'aruthras06@gmail.com',
        to: id,
        subject: 'Password Reset',
        text: 'Your new Password is ' + npass,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
          return res.status(500).json('failed');
        }

        res.status(200).json('success');
      });
    });
  });
});

app.post('/login', (req, res) => {
    const credential = req.body.credential;
    const password = req.body.password;
    const query = `select * from user where (username=? or email=?)`;
    con.query(query, [credential, credential], (err, data) => {
        if (err) { return res.status(500).json(err); console.log(err) }
        else if (data.length == 0) { return res.status(404).json('invalid'); }
        else {
            key = crypto.randomBytes(32).toString('hex');
            bcrypt.compare(password, data[0].password, (err, response) => {
                if (err) { return res.status(500).json('Internal server error'); }
                if (response) {
                    const username = data[0].username;
                    const token = jwt.sign({ username }, key);
                    res.cookie('token', token);
                    return res.status(200).json(data[0].username);
                }
                else { console.log(404); return res.status(404).json('invalid') };
            })
        }
    })
});

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).send('success');
});

app.get('/protected', (req, res) => {
    const token = req.cookies.token;
    if (!token) res.status(401).json({ error: 'invalid' });
    jwt.verify(token, key, (err, user) => {
        if (err) res.status(403).json({ error: 'invalid' });
        res.status(200).json({ status: 'valid' });
    })
})

app.post('/signup', (req, res) => {
    const credential = req.body.credential;
    const query = `select * from user where (username=? or email=?)`;
    con.query(query, [credential, credential], (err, data) => {
        if (err) { res.status(500).send('invalid'); console.log(err); }
        else if (data.length > 0) { res.status(200).send('invalid'); }
        else { res.status(200).send('valid'); }
    })
})
app.listen(port, () => {
    console.log("Listening at " + port);
})