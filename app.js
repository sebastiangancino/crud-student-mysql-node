const express = require("express")
const app = express();
const path =require("path")
const port = 3004;
const mysql = require("./connection").con

//configuration
app.set("view engine", "hbs")
app.set("views", "./view")
/* app.use(express.static(__dirname + "/public")) */
 app.use(express.static(path.join(__dirname, 'public')))
 app.use(express.urlencoded({extended: false}))
app.use(express.json()) 


 /**/

 




//Routing

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/update", (req, res) => {
  res.render("update");
});

app.get("/delete", (req, res) => {
  res.render("delete");
});

app.get("/view", (req, res) => {
  let qry = "select * from ESTUDIANTE ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("view", { data: results });
        }
});
});

app.get("/addstudent", (req, res) => {
  //fetching data from form
  const { cod_estu, cod_nac, apellido_estu, nombre_estu, telefono_estu, correo_estu, fecha_nac_estu, ident_estu, direccion_estu } = req.query;

  //Snitization XSS..
  let qry = "select * from ESTUDIANTE  where cod_estu=?";
  mysql.query(qry, [cod_estu], (err, results) => {
    if (err) throw err;
    else {
      if (results.length > 0) {
        res.render("add", { checkmesg: true });
      } else {
        //insert query
        let qry2 = "insert into ESTUDIANTE values (?,?,?,?,?,?,?,?,?)";
        mysql.query(qry2, [cod_estu, cod_nac, apellido_estu, nombre_estu, telefono_estu, correo_estu, fecha_nac_estu, ident_estu, direccion_estu], (err, results) => {
          if (results.affectedRows > 0) {
            res.render("add", { mesg: true });
          }
        });
      }
    }
  });
});

app.get("/searchstudent", (req, res) => {
  //fetch data from the form
  const { cod_estu } = req.query;
  let qry = "select * from ESTUDIANTE where cod_estu=?";

  mysql.query(qry, [cod_estu], (err, results) => {
    if (err) throw err;
    else {
      if (results.length > 0) {
        res.render("search", { mesg1: true, mesg2: false });
      } else {
        res.render("search", { mesg1: false, mesg2: true });
      }
    }
  });
});

app.get("/updatesearch", (req, res) => {
  const {cod_estu} = req.query;

  let qry = "select * from ESTUDIANTE where COD_ESTU=?";
  mysql.query(qry, [cod_estu], (err, results) => {
    if (err) throw err
    else {
      if (results.length > 0) {
        res.render("update", { mesg1: true, mesg2: false, data: results });
      } else {
        res.render("update", { mesg1: false, mesg2: true });
      }
    }
  });
})

app.get("/updatestudent", (req, res) => {
  // fetch data

  const {cod_estu ,cod_nac, apellido_estu, nombre_estu, telefono_estu, correo_estu, fecha_nac_estu, ident_estu, direccion_estu} = req.query;
  let qry = "update ESTUDIANTE set cod_nac=?, apellido_estu=?, nombre_estu=?, telefono_estu=?, correo_estu=?, fecha_nac_estu=?, ident_estu=?, direccion_estu=? where cod_estu=?";

  mysql.query(qry, [cod_nac, apellido_estu, nombre_estu, telefono_estu, correo_estu, fecha_nac_estu, ident_estu, direccion_estu, cod_estu], (err, results) => {
    if (err) throw err
    else {
      if (results.affectedRows > 0) {
        res.render("update", { umesg: true });
      }
    }
  })
});



app.get("/removestudent", (req, res) => {

  // fetch data from the form


  const { cod_estu } = req.query;

  let qry = "delete from ESTUDIANTE where cod_estu=?";
  mysql.query(qry, [cod_estu], (err, results) => {
      if (err) throw err
      else {
          if (results.affectedRows > 0) {
              res.render("delete", { mesg1: true, mesg2: false })
          } else {

              res.render("delete", { mesg1: false, mesg2: true })

          }

      }
  });
});
 

//Create server
app.listen(port, (err) => {
  if (err) throw err;
  else console.log("Running in port: ", port);
});
