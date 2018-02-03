// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var view1 = myApp.addView('#view-1');
var view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3');
var view4 = myApp.addView('#view-4');
var view5 = myApp.addView('#view-5');

          //facebook login starts 
        
			   var userId = "nothing"; //creating variable user ID that will be used later 
			  
              // This is called with the results from from FB.getLoginStatus().
              function statusChangeCallback(response) {
                console.log('statusChangeCallback');
                console.log(response);
                // The response object is returned with a status field that lets the
                // app know the current login status of the person.
                // Full docs on the response object can be found in the documentation
                // for FB.getLoginStatus().
                if (response.status === 'connected') {
                  // Logged into your app and Facebook.
                  testAPI();
                  $(".loginIn").hide();
                  $(".loginOut").show();
                } else {
                  // The person is not logged into your app or we are unable to tell.
                  document.getElementById('status').innerHTML = 'Please log ' +
                  'into this app.';
                  $(".loginIn").show();
                  $(".loginOut").hide();
                }
              }

              // This function is called when someone finishes with the Login
              // Button.  See the onlogin handler attached to it in the sample
              // code below.
              function checkLoginState() {
                FB.getLoginStatus(function(response) {
                  statusChangeCallback(response);


                });
              }

              window.fbAsyncInit = function() {
                FB.init({
                  appId      : '1079006898900009',
                  cookie     : true,  // enable cookies to allow the server to access
                  // the session
                  xfbml      : true,  // parse social plugins on this page
                  version    : 'v2.10' // use graph api version 2.8
                });

                // Now that we've initialized the JavaScript SDK, we call
                // FB.getLoginStatus().  This function gets the state of the
                // person visiting this page and can return one of three states to
                // the callback you provide.  They can be:
                //
                // 1. Logged into your app ('connected')
                // 2. Logged into Facebook, but not your app ('not_authorized')
                // 3. Not logged into Facebook and can't tell if they are logged into
                //    your app or not.
                //
                // These three cases are handled in the callback function.

                FB.getLoginStatus(function(response) {
                  statusChangeCallback(response);

                });

              };

              // Load the SDK asynchronously
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));

              // Here we run a very simple test of the Graph API after login is
              // successful.  See statusChangeCallback() for when this call is made.
              function testAPI() {

                console.log('Welcome!  Fetching your information.... ');

                FB.api('/me', function(response) {
                  console.log('Successful login for: ' +  response.id);

                 // document.getElementById('status').innerHTML = response.id;

                  userId = response.id;
				  console.log("called test method" + userId);
                  // we can use this variable userId to insert into a div more exacly where we need to interact with a certain user ID 
				  
                });
              }
			  
            
              function logoutPerson(){

                FB.logout(function(response) {
                  // Person is now logged out

                  window.location.reload();
                  //and the page is refreshed
                });


              }

          //facebook login ends 
			  
		  
          //Sports Feed 
		  
          $.getJSON( "https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=4fc83d88b81845b8a492e394a36d82dd", function( data ) { //gets my news api json 

		  //here we are getting that jSon format data and transforming in human readable data and setting that we want to see only 10 of the news 
            console.log(data.articles)      
            var arrayOfData = data.articles
            for (var i = 0; i < 10; i++) {
              var desc = arrayOfData[i].description;
              var img = arrayOfData[i].urlToImage;
              document.getElementById('sports').innerHTML += '<img height="40px" width="40px" src="'+img+'"/>' + desc + '<br>' ;
            }

          });
		  
		  
		  //Business Feed
		  
            $.getJSON( "https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=4fc83d88b81845b8a492e394a36d82dd", function( data ) {  //refer to comments on the previous script
					

			//refer to comments on previous script
              console.log(data.articles)
              var arrayOfData = data.articles
              for (var i = 0; i < 10; i++) {
                var desc = arrayOfData[i].description;
                var img = arrayOfData[i].urlToImage;
                document.getElementById('business').innerHTML += '<img height="40px" width="40px" src="'+img+'"/>' + desc + '<br>' ;
              }

            });
      
	      //Finance Feed

            $.getJSON( "https://newsapi.org/v1/articles?source=financial-times&sortBy=latest&apiKey=4fc83d88b81845b8a492e394a36d82dd", function(data) {

              console.log(data.articles)
              var arrayOfData = data.articles
              for (var i = 0; i < 10; i++) {
                var desc = arrayOfData[i].description;
                var img = arrayOfData[i].urlToImage;
                document.getElementById('finance').innerHTML += '<img height="40px" width="40px" src="'+img+'"/>' + desc + '<br>' ;
              }

            });
			
			
		  //Kyle's top 10 news 

            $.get( "http://52.48.79.163/db.php", { type: "top10stories" } )
            .done(function( data ) {

              // parse json
              var obj = jQuery.parseJSON(data);
              // print out a story
              //console.log(obj.news.story); // show on the console the data we are getting 

			  //variable to read kyle's news from the db and post only 10 lines of news 
              var news = obj.news.story
              for (var i = 0 ; i < 10; i++) {
                var desc = news[i];
                document.getElementById('top10stories').innerHTML += desc + '<br>' ; //so each story will be break down to a next line until we reach 10 news 
              }
            });
        
		
		  //My breaking news 
		  
		
			$.get( "http://52.48.79.163/db.php?type=getmystories&id=10210964108039509") //hard-codded id in order to pull stories faster 
			.done(function( res ) {

			  var myJSON = JSON.stringify('Now on the news: <br><br>' + res + '<br> that is the end of it for now' ); // That's my personal JSON format text 
		      var clean = window.decodeURIComponent(myJSON); //cleans/decodes URI retrieved from databases so instead of having %20 you will have spaces 
						
			  console.log( "get my stories "+ userId ) //debug code check if id is being loaded
			  document.getElementById('getmystories').innerHTML += clean + '<br>' ; //gets the data from the DB that has been through a custom Json format and decoded and shows it onto the browser 

			});
			
		 //Saving my breaking news 
	
				
			function saveStory(){   //this function will save the stories write into Kyle's DB using the data collected on the form below this script 
			  alert(userId); 
			  var data = document.getElementById('story').value;  //here we are creating variable data that is an instance of the story value 
			  var res = encodeURIComponent(data); //this encodes the data in order to send it to the db and we call this variable res 
				  
			  $.get( "http://52.48.79.163/db.php", { type: "newstory", id:userId, data:res } ) // so here you have the DB address, the type of story we want to send (where in the db this data will be stored) , my dynamic id with the variable we created at the login and my data that I want to send already encoded called Res 
		      .done(function( res ) {
			  });

			}
			
				    
    