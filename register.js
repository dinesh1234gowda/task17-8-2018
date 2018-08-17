var express=require('express');



var bodyparser=require('body-parser');

var app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
//pp.use(express.static('expressjs'),{index:false});


var mongo=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/";

var dir='/home/dinesh/Downloads/expressjs/html/'
app.get('/',function(req,res)
{
	res.sendFile(dir+'register.html')

});
app.get('/signin',function(req,res)
{
	res.sendFile(dir+"signin.html");
});

app.post('/register',function(req,res)
{

	
	var reg={
		name:req.body.name,
		address:req.body.address,
		gender:req.body.gender,
		password:req.body.pass,
		mobile:req.body.mobile
	};
	

	mongo.connect(url,function(err,db)
	{
		var dbo=db.db("new");
		dbo.collection("register").find({mobile:req.body.mobile}).toArray(function(err,result)
		{
			if(err) throw err;

			if(result.length>=1)
			{

				res.redirect("/");
				//res.send("you are already registered user");
			}

			else
			{
				dbo.collection("register").insertOne(reg,function(err,re)
				{
					if(err)	throw err;

					if(re.insertedCount==1)
					{
						res.redirect("/signin");
						
					}
				});
			}
		})
	})
})





app.post('/profile',function(req,res)
{
	var obj={
		name:req.body.name,
		password:req.body.passw
	};

	mongo.connect(url,function(err,db)
	{
		var dbo=db.db("new");

		dbo.collection("register").find(obj).toArray(function(err,result)
		{
			if(result.length>=1)
			{
				res.send("welcome to your page");
			}
			else
			{
				res.redirect('/');
			}


		})


	})


})
app.listen(8009);
