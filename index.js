var wpcom = require( 'wpcom' )('<Your Token Goes Here>');

$('#display').click( displayPost );
$('#single').click( displayPostByID );
$('#add').click( addPost );
$('#me-stuff').click( displayMe );


function displayPost() {
    $( "#results" ).empty(); 
    var blogPost = wpcom.site( '<Site ID goes here>' );
    blogPost.postsList()
        .then( List => { 
            var details = [];
            details.push('<h1>' + List.posts[0].title + '</h1>');
            details.push('<img src="' + List.posts[0].featured_image + '">');
            details.push('<h3>' + List.posts[0].content + '</h3>');
            console.log(List);
            $( '#results' ).append( details );
        })
        .catch( error => {  console.log(error) } );
}

function displayPostByID() {
	$( "#results" ).empty();
    var theID = $( "#postid" ).val();
    var thePost = wpcom.site('<Site ID goes here>').post(theID);
    thePost.get()
        .then(Post =>{
            var detail = [];
            detail.push('<h1>' + Post.title + '</h1>');
            detail.push('<h3>' + Post.ID + '</h3>');
            detail.push('<h3>' + Post.content + '</h3>');
            console.log(Post);
            $( '#results' ).append( detail );
        })
        .catch( error => {  console.log(error) } );

};

function addPost() {
    var theTitle = $( "#title" ).val();
    var theContent = $( "#content" ).val();
    
    var theImage = $( '#mediaURL' ).val();
	var imgTitle = $( '#imageTitle' ).val();
	var imgDesc = $( '#imageDesc' ).val();
    var media = wpcom.site('<Site ID goes here>').media();
    media.addUrls({
    	title: imgTitle,
    	description: imgDesc,
    	url: theImage
  	})
    .then( image => {
				console.log('Image Info: ', image);
				var tmpIMG =  image.media[0].ID;

                var data = { title: theTitle, content: theContent, featured_image: tmpIMG };
                var newPost = wpcom.site('<Site ID goes here>').post();
                newPost.add(data)
                    .then( res => {  console.log(res) } )
                    .catch( error => {  console.log(error) } )
    })
    .catch( error => {  console.log(error) } );
    
}

function displayMe() {
	var mySite = wpcom.site( '<Site ID goes here>' );
    mySite.stats()
	    .then( info => {  console.log('info: ', info) } )
	    .catch( error => {  console.log(error) } )
}