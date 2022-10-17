
//Sign up function call

exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post       = req.body;
      var user_name  = post.user_name;
      var password   = post.password;
      var first_name = post.first_name;
      var last_name  = post.last_name;
      
      if(user_name.length === 0 || password.length === 0 || first_name.length === 0 || last_name.length === 0){
         message = "Unsuccessful, one of the fields are missing";
         res.render ('signup.ejs',{message: message});
      }

      else{
      var sql = "INSERT INTO `users`(`first_name`,`last_name`,`user_name`, `password`) VALUES ('" + first_name + "','" + last_name + "','" + user_name + "','" + password + "')";

      var query = db.query(sql, function(err, result) {

         message = "Succesfully! Your account has been created.";
         res.render('signup.ejs',{message: message});
      });
      }
   } else {
      res.render('signup');
   }
};


// Login function
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
     

      var post      = req.body;
      var user_name = post.user_name;
      var password  = post.password;
      
      


      var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+ user_name +"' and password = '" + password + "'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.userInfo = results[0];

            res.redirect('/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('index.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
   }
           
};

//Log Out function
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};

// Dashboard function
exports.dashboard = function (req,res){
   var User_Info = req.session.userInfo;
   var message = '';
   var user_ID = req.session.userId;
   if(user_ID == null){
      //console.log("HERE");
      res.redirect('/login');

   }
   else{
      message = User_Info.first_name + " " + User_Info.last_name;
      res.render('dashboard.ejs', {message: message});
   }
};

//Map Function 
 exports.map = function(req, res){
   var message = '';
   var Long = [];
   var Lat = [];
   var Info =[];
   var Address = [];
   var Rates =[];
      var sql="SELECT Latitude, Longitude, Info, Address, Rates FROM `parking_spots`";                           
      db.query(sql, function(err, results){      
          for( var i=0; i<results.length; i++){
            Lat.push(results[i]['Latitude'].toString());
            Long.push(results[i]['Longitude'].toString());
            Info.push(  results[i]['Info'].toString());
            Address.push(  results[i]['Address'].toString());
            Rates.push( results[i]['Rates'].toString());

          }
          
          res.render('map.ejs', 
            {Long: Long,
               Lat:Lat,
               Info : Info,
               Address : Address,
               Rates : Rates
            });          
      });
           
};

//Map Function 
 exports.ListerMap = function(req, res){
   var message = '';
   var Long = [];
   var Lat = [];
   var Info =[];
   var Address = [];
   var Rates =[];
      var sql="SELECT Latitude, Longitude, Info, Address, Rates FROM `parking_spots`";                           
      db.query(sql, function(err, results){      
          for( var i=0; i<results.length; i++){
            Lat.push(results[i]['Latitude'].toString());
            Long.push(results[i]['Longitude'].toString());
            Info.push(  results[i]['Info'].toString());
            Address.push(  results[i]['Address'].toString());
            Rates.push( results[i]['Rates'].toString());

          }
          
          res.render('ListerMap.ejs', 
            {Long: Long,
               Lat:Lat,
               Info : Info,
               Address : Address,
               Rates : Rates
            });          
      });
           
};