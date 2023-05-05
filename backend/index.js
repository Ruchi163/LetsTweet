import express from "express";
import cors from 'cors';
import mysql, { createConnection } from 'mysql'
import session from "express-session";
import pkg from 'body-parser'
import bodyParser  from "body-parser";
import cookieParser from "cookie-parser";
import moment from "moment";



const app=express();
const { urlencoded } = pkg;

app.use(express.json());
app.use(urlencoded({extended: true}));


const db = createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'post' 
  });

  db.connect((err) =>{
    
    console.log('Mysql Connected with App...');
  });

  app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,
  }));

  app.use(session({
    key:"userid",
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    cookie:{
      expires:60*600*24
    },
  }))

  app.get('/login',(req,res)=>{
    if(req.session.user){
        res.send({loggedin:true,user:req.session.user})
    }
    else{
        res.send({loggedin:false});
    }
})


  app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    const search='select * from login_db where username=? and password=?';
    db.query(search,[username,password],(error,result)=>{
        if(result.length>0){
            req.session.user=result;
            console.log(req.session.user);
            res.send(result);
        }
        else{
            res.send({message:"User Not Found"})
        }
    })
})


app.get('/logout',(req,res)=>{
  req.session.destroy();
  res.clearCookie('userid'); 
// Used to delete cookie from applications
  
  res.redirect('/login');
})




app.get("/api/get/:id",(req,res)=>{
  const{id}=req.params;
  const sqlGet="SELECT * FROM post_db WHERE id =?";
  db.query(sqlGet,id,(error,result)=>{
    result.forEach((resultt)=>{resultt.timestamp=moment(resultt.timestamp).fromNow()});
      res.send(result);
  });
});


app.get("/api/get",(req,res)=>{
    const sqlGet="SELECT * FROM post_db order by id desc";
    db.query(sqlGet,(error,result)=>{
        result.forEach((resultt)=>{resultt.timestamp=moment(resultt.timestamp).fromNow()});
        res.send(result);
    });
});



app.post("/api/auth",(req,res)=>{
  const {title,body,timestamp,username}=req.body;
  
  const sqlInsert="INSERT INTO post_db (title ,body,timestamp,username) VALUES (?,?,?,?)";
  db.query(sqlInsert,[title,body,timestamp,username],(error,result)=>{
    if(error) console.log(error);
  });
});




app.post("/adduser",(req,res)=>{
  const {username,email,password,isadmin}=req.body;
  
  const sqlInsert="INSERT INTO login_db (username ,email,password,isadmin) VALUES (?,?,?,?)";
  db.query(sqlInsert,[username,email,password,isadmin],(error,result)=>{
    if(error) console.log(error);
  });
});



app.delete('/api/remove/:id',(req,res)=>{
    const {id}=req.params;
    const sqlremove='Delete from post_db where id=?';
    db.query(sqlremove,id,(error,result)=>{
        if(error) console.log(error);
    })
})


app.put("/api/update/:id",(req,res)=>{
  const{id}=req.params;
  const{title,body,timestamp}=req.body;
  const sqlUpdate="UPDATE post_db SET title=?,body=?, timestamp=? WHERE id=?";
  db.query(sqlUpdate,[title,body,timestamp,id],(error,result)=>{
    if(error) console.log(error);
      res.send(result);
  });
});


app.get("/mypage/:username",(req,res)=>{
  const {username}=req.params;
  const q='select * from post_db where username=?';
  db.query(q,[username],(err,result)=>{
    if(err) console.log(err);
    // console.log(username)
    result.forEach((resultt)=>{resultt.timestamp=moment(resultt.timestamp).fromNow()});
    res.send(result);
  })

})



















app.listen (8080, () => {
console.log("Server is running on port 8080");
})