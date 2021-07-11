const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");




const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));


mongoose.connect("mongodb+srv://ananya:ananyaananya@cluster0.1zroo.mongodb.net/todoListDB?retryWrites=true&w=majority",{  useUnifiedTopology: true,useNewUrlParser: true  } );


const itemSchema=new mongoose.Schema({
    name:String
});

const Item=mongoose.model("Item",itemSchema);

app.get("/", function (req, res) {
    const date = new Date();
    var options = { weekday: "long", month: "long", day: "numeric" };
    var day = date.toLocaleDateString("en-US", options);

Item.find({},function(err,foundItems){
    if(err)
    {
        console.log(err);
    }
    else{
        //console.log(foundItems);
        res.render("list",{maintitle:day,listitems:foundItems})
}
});
});


app.post("/", function (req, res) {
        
     
      const newitem=req.body.newitem;
      const additem=new Item({
          name:newitem
      });
      additem.save();

      res.redirect("/");
    
});


app.post("/delete",function(req,res){
    const itemid=req.body.checkbox;

    Item.findByIdAndDelete(itemid,function(err){
        if(err)
        {
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    })
})
app.listen(process.env.PORT || 3000, function () {
    console.log("server is running!!");
})