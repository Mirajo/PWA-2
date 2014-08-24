/*  
	Pronizer
	Author: Miranda Johnson
	PWAII
*/

(function($) {

    /*
     ======================== TOOL TIP =====================
     */
    $('.masterTooltip').hover(function(){                                  //tool tip function with hover
        var title = $(this).attr('title');                                 //variable title for this
        $(this).data('tipText', title).removeAttr('title');                //remove attribute from title
        $('<p class="tooltip"></p>')                                       //tool tip class applied to p
            .text(title)                                                   //applied to titles of doc
            .appendTo('body')                                              //append to body of doc
            .fadeIn('slow');                                               //fade tool tip in slow
    }, function() {
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
    }).mousemove(function(e) {                                             //functions for mouse
        var mousex = e.pageX + 20;                                         //var for x coordinates of mouse
        var mousey = e.pageY + 10;                                         //var for y coordinates of mouse
        $('.tooltip')                                                      //
        .css({ top: mousey, left: mousex })                                //x & y mouse coordinates for css
    });
	/*
	======================== APPLICATION FUNCTIONS =====================
	*/

	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				// if user, loadApp()
				// if error, loadLanding()
			}
		});
	};

    /*
     ========================= MODAL ========================
     */
    $('.modalClick').on('click', function(event){
        event.preventDefault();                                      //prevent default page use modal
         $('#overlay')                                               //call out the overlay
             .fadeIn()                                               //Fade in the overlay
             .find('#modal')                                         //find the modal
             .fadeIn();                                              //fade in the modal
    });

    $('.close').on('click', function(event){                         //close modal on click
        event.preventDefault();                                      //prevent default page use modal
        $('#overlay')                                                //call out overlay
            .fadeOut()                                               //Fade out overlay
            .find('#modal')                                          //find modal
            .fadeOut();                                              //fade out modal

    });

    /*
     ====================== FADING STATUS OPTION =======================
     */
    $('.status').mouseover(function(){                                //move over status icons
        $(this).fadeTo(100,.3);                                       //fade icons during mouse over
     });

    $('.status').mouseout(function(){                                 //mouse over status icons
        $(this).fadeTo(100,1);                                        //fade icons during mouse over
     });

    /*
     ====================== TABBED ACCORDION NAVIGATION ====================
     */
    $('#tabs p').hide().eq(0).show();                                //hide every p
    $('#tabs p:not(:first)').hide();                                 //first tab is visible the others are hidden


    $('#tabs-nav li').click(function(e) {                            //call div tabs nav
        e.preventDefault();                                          //prevent the default behavior
        $('#tabs p').hide();                                         //hide the p in the tabs div


        $('#tabs-nav .current').removeClass('current');              //show the current nav then remove class
        $(this).addClass('current');                                 //add class to current
        var clicked = $(this).find('a:first').attr('href');          //variable

        $('#tabs ' + clicked).fadeIn('slow');                        //fade in slow when clicked
    }).eq(0).addClass('current');                                    //add class to current

    /*
     ====================== DISPLAY USERNAME ====================
     */
    $.getJSON("xhr/check_login.php", function(data){                 //retrieve data from login page in xhr directory
        console.log(data);                                           //print out the data
        $.each(data, function(key, val){                             //
            console.log(val.first_name);                             //print out value or first name
            $(".userid").html("Welcome User: " + val.first_name);    //concatenate username to welcome message
        })
    });

    /*
     ====================== GET PROJECTS ====================
     */
    var projects = function(){                                                   //create variable for projects function
        $ajax({                                                                  //call ajax
          url: 'xhr/get_projects.php',                                           //retrieve from this url
            type: 'get'                                                          //the type is get
            dataType: 'json',                                                   //use datatype json
            success: function(response){                                         //success function
                if(response.error){                                              //if successful proceed
                 console.log(response.error);                                    //print out error
                }else{                                                           //if/else
                for(var i=0, j=response.projects.length; i < j; i++){            //for loop for response of projects
                var result = response.projects[i];                               //

               $(".projects").append(                                            //append to projects selector
                   '<div style="border: 1px solid black>' +                      //add a border to projects div
                   "<input class='projectid' type='hidden' value='" + result.id + "'>" +  //hide input
                   "Project Name: " + result.projectName + "<br>" +              //concatenate form input to project name
                   "Project Description: " + result.projectDescription + "<br>"  //concatenate form input to project Description
                   "Project Status: " + result.status + "<br>"                   //concatenate form input to project status
                   + '<button class="deletebtn"> Delete</button>'                //add delte button to delete project
                   +'<button class="editbtn">Edit</button>'                      //add edit button to edit project
                   +'</div> <br>'                                                //

            })

       $('deletebtn').on('click', function(e){                                   //
        console.log('test delete');                                              //
        $.ajax({                                                                 //
           url: 'xhr/delete_project.php',                                        //
           data: {                                                               //
               projectID: result.id                                              //
           },                                                                    //
            type: 'POST',                                                        //
            dataType: 'json',                                                    //
            success: function(response){                                         //
                console.log('Testing for success');                              //
             if(response.error){                                                 //
                 alert(response.error);                                          //
             }else{                                                              //
                 window.location.assign("projects.html");                        //
             };
           }
        });
      });
    }
  }
})
   }
     projects();

    /*
     ====================== NEW PROJECTS ====================
     */
    $('#addButton').on('click', function() {
        var projName = $('#projectName').val(),
            projDesc = $('#projectDescription').val(),
            projDue = $('#projectDueDate').val(),
            status = $('input[name = "status"]:checked').prop("id");

        $.ajax({
            url: "xhr/new_project.php",
            type: "post",
            dataType: "json",
            data: {
                projectName: projName,
                projectDescription: projDesc,
                dueDate: projDue,
                status: status
            },
            success: function(response) {
                console.log('Test projects');
            }
        })
    }


    /*
     ====================== LOGIN ====================
     */
    $('signinButton').click(function() {
        var user = $('#user').val();
        var pass = $('#pass').val();
        console.log("The password is working");
        $.ajax({
            url:'xhr/login.php',
            type: 'post',
            dataType: 'json',
            data: {
               username: user,
               password: pass

            },
           success: function(response) {
               console.log("Demo User");
               if(response.error) {
                   alert(response.error);
               }else{
                   window.location.assign('admin.html')

               };

           }

        });
    });



    /*
     ====================== LOGOUT ====================
     */
     $('#logout').click(function(e) {
         e.preventDefault;
         $.get('xhr/logout.php',function(){
             window.location.assign('index.html')
         })

     });


    /*
     ====================== REGISTRATION PAGE ====================
     */
     $('#register').on('click', function() {
         var firstname = $('#first').val(),
             lastname = $('#last').val(),
             username = $('#userName').val(),
             email = $('#email').val(),
             password = $('password').val();
             console.log(firstname+' '+lastname+' '+username+' '+email+' '+password);

         $.ajax({
             url:'xhr/register.php',
             type: 'post',
             dataType: 'json',
             data: {
                 firstname: firstname,
                 lastname: lastname,
                 username: username,
                 email: email,
                 password: password
             },
         success: function(response) {
             if(response.error) {
                 alert(response.error);
             }else{
                 window.location.assign('index.html');

             }
           }

         });
     });


    /*
     ====================== INDEX TO SIGN UP PAGE ====================
     */
    $('#signupbtn').on('click', function(e) {
        e.preventDefault();
        window.location.assign('projects.html');
    });

    /*
     ====================== DASHBOARD BUTTON TO DASHBOARD ====================
     */
    $('.dashboard').on('click', function(e) {
        e.preventDefault();
        window.location.assign('dashboard.html');
    });

    /*
     ====================== GO TO PROFILE PAGE ====================
     */
    $('#profilebtn').on('click', function(e) {
        e.preventDefault();
        window.location.assign('profile.html');
    });

    /*
     ====================== ADD PROJECTS PAGE ====================
     */
    $('.addbtn').on('click', function(e) {
        e.preventDefault();
        window.location.assign('add.html');
    });

    /*
    ====================== DISPLAY USERNAME ====================
    */

    $.getJSON("xhr/check_login.php", function(data) {
        console.log(data);
        $.each(data, function(key,val){
            console.log(val.first_name);
            $(".userid").html("Welcome User: " + val.first_name);
        })
    });

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
	
		checkLoginState();
	};
	
	
	init();
	
		
	/*
	===============================================
	======================================== EVENTS	
	*/
	
	
	/*	
	==================================== END EVENTS 
	===============================================
	*/
		
		

	
})(jQuery); // end private scope




